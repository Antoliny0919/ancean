import os

from django.db.models import Q
from django.urls import reverse
from rest_framework import status

from posts.models import Post
from posts.serializers import PostSerializer
from posts.tests.mock import PostTestAllState, PostTestBase
from users.tests.mock import COMMON_USER, TestUserSet


class PostViewTestCase(PostTestBase):

  def test_create_post(self):
    body = {
      "title": "test_post1",
      "author": self.writer.object.name,
    }
    response = self.writer.client.post("/api/posts/", body)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    post = Post.objects.get(id=response.data["id"])
    self.assertEqual(os.path.exists(post.get_image_storage_path()), True)
    self.assertIsNone(post.created_at)

  def test_patch_post(self):
    body = {
      "title": "request_patch"
    }
    response = self.writer.client.patch(f"/api/posts/{self.test_post.id}/", body)
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data["title"], body["title"])
    self.assertIsNone(self.test_post.created_at)

  def test_delete_post(self):
    response = self.writer.client.delete(f"/api/posts/{self.test_post.id}/")
    self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    self.assertEqual(os.path.exists(self.test_post.get_image_storage_path()), False)


class PostGetTestCase(PostTestAllState):

  @classmethod
  def setUpTestData(cls):
    super().setUpTestData()
    cls.anonymous = TestUserSet(**COMMON_USER, is_anonymous=True)

  def tearDown(self):
    super().tearDown()
    self.anonymous.object.delete()

  def test_get_list_posts(self):
    # Anonymous users can only get posts with is_finish, is_public all true.
    response = self.anonymous.client.get("/api/posts/")
    expected_response = Post.objects.filter(is_finish=True, is_public=True).values("id")
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(
      [data["id"] for data in response.data],
      [data["id"] for data in expected_response]
    )
    self.assertEqual(2, expected_response.count())
    # The writers can get posts with is_finish, is_public true posts
    # And even if is_public is false it is owner can get corresponding post.
    writer = getattr(self, "writer0")
    response = writer.client.get("/api/posts/")
    expected_response = Post.objects.filter(is_finish=True).exclude(
      ~Q(author=writer.object.name) & Q(is_public=False)
    ).values("id")
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(
      [data["id"] for data in response.data],
      [data["id"] for data in expected_response]
    )
    self.assertEqual(3, expected_response.count())

  def test_get_list_none_finish_posts(self):
    writer = getattr(self, "writer0")
    response = writer.client.get(reverse("none_finish_posts_list"))
    expected_response = Post.objects.filter(is_finish=False, author=writer.object.name)
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data, PostSerializer(expected_response, many=True).data)


class PostSetCreatedAtTest(PostTestBase):

  def test_direct_finish_post(self):
    """
    Test if created_at is set when is_finish is True during initial post creation
    """
    body = {
      "title": "test_direct_finish",
      "author": self.writer.object.name,
      "is_finish": True
    }
    response = self.writer.client.post("/api/posts/", body)
    self.assertIsNotNone(response.data["created_at"])

  def test_late_finish_post(self):
    """
    Test created_at settings when is_finish is True via the patch method after post creation
    """
    body = {
      "title": "test_late_finish",
      "is_finish": True
    }
    response = self.writer.client.patch(f"/api/posts/{self.test_post.id}/", body)
    self.assertIsNotNone(response.data["created_at"])
