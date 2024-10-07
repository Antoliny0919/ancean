from django.db.models.fields import BooleanField
from django.test import TestCase

from ancean.tests.tools import ModelTestTools
from posts.models import Post
from users.tests.mock import WRITER_USER, WRITER_USER2, TestUserSet


class PostTestBase(TestCase):

  @classmethod
  def setUpTestData(cls):
    cls.writer = TestUserSet(**WRITER_USER)
    body = {
      "title": "first_post",
      "author": cls.writer.object.name,
    }
    response = cls.writer.client.post("/api/posts/", data=body)
    cls.test_post = Post.objects.get(id=response.data["id"])

  def tearDown(self):
    self.writer.object.delete()


class PostTestAllState(TestCase, ModelTestTools):
  writers = [WRITER_USER, WRITER_USER2]
  # Get only BooleanField of all fields in the Post model
  state_fields = [
    field.verbose_name.replace(" ", "_") for field in Post._meta.get_fields()
    if field.__class__ == BooleanField
  ]

  @classmethod
  def setUpTestData(cls):
    """
    Generates a post with all combinations of state fields,
    which are the Boolean fields of the Post model.
    """
    for index, writer in enumerate(cls.writers):
      setattr(cls, f'writer{index}', TestUserSet(**writer))
      writer = getattr(cls, f'writer{index}')
      state_field_cases = cls.all_state_field_cases()
      posts_body = [
        dict(**case, **{
          "title": f"case-post-{id} : {writer.object.name}",
          "author": writer.object.name,
        }) for id, case in enumerate(state_field_cases)
      ]
      for post in posts_body:
        writer.client.post("/api/posts/", data=post)

  def tearDown(self):
    for writer_index in range(len(self.writers)):
      writer = getattr(self, f'writer{writer_index}')
      writer.object.delete()
