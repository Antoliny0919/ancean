from rest_framework import status

from posts.tests.mock import PostTestBase
from users.tests.mock import COMMON_USER, WRITER_USER2, TestUserSet


class WriterPermissionTestCase(PostTestBase):
  @classmethod
  def setUpTestData(cls):
    super().setUpTestData()
    w2 = WRITER_USER2.copy()
    w2.update({"name": "tester_writer3", "email": "tester_writer3@test.com"})
    cls.w2 = TestUserSet(**w2)
    cls.anonymous = TestUserSet(**WRITER_USER2, is_anonymous=True)
    cls.none_writer = TestUserSet(**COMMON_USER)

  def tearDown(self):
    super().tearDown()
    self.w2.object.delete()
    self.none_writer.object.delete()
    self.anonymous.object.delete()

  def test_anonymous_write_post(self):
    body = {
      "title": "I'm anonymous",
      "author": self.anonymous.object.name
    }
    response = self.anonymous.client.post("/api/posts/", data=body)
    self.assertContains(response,
                        status_code=status.HTTP_403_FORBIDDEN,
                        text="Permission does not exist.")

  def test_none_writer_write_post(self):
    body = {
      "title": "I'm none_writer",
      "author": self.none_writer.object.name,
    }
    response = self.none_writer.client.post("/api/posts/", data=body)
    self.assertContains(response,
                        status_code=status.HTTP_403_FORBIDDEN,
                        text="Permission does not exist.")

  def test_none_owner_patch_post(self):
    body = {
      "title": "change title",
    }
    response = self.w2.client.patch(f"/api/posts/{self.test_post.id}/", body)
    self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    self.assertDictEqual
    (
      response.data,
      {"detail": f"The PATCH request is only allowed for owner {self.test_post.author}."}
    )


class PrivatePostPermissionTestCate(PostTestBase):
  @classmethod
  def setUpTestData(cls):
    super().setUpTestData()
    cls.w2 = TestUserSet(**WRITER_USER2)
    cls.anonymous = TestUserSet(**COMMON_USER, is_anonymous=True)
    # Turn testpost to private state
    cls.writer.client.patch(f"/api/posts/{cls.test_post.id}/", data={"is_public": False})

  def tearDown(self):
    super().tearDown()
    self.w2.object.delete()
    self.anonymous.object.delete()

  def test_private_post_access(self):
    """
    Only owner accessible inspection when post is in private state.
    """
    for user in [self.w2, self.anonymous]:
      response = user.client.get(f"/api/posts/{self.test_post.id}/")
      self.assertContains(
        response,
        status_code=status.HTTP_403_FORBIDDEN,
        text="This is a private post"
      )
    response = self.writer.client.get(f"/api/posts/{self.test_post.id}/")
    self.assertEqual(response.status_code, status.HTTP_200_OK)
