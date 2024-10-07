import os
import shutil

from django.core.exceptions import ValidationError
from django.db import models
from django_prometheus.models import ExportModelOperationsMixin

from category.models import Category
from users.models import User

# Create your models here.


class Post(ExportModelOperationsMixin('post'), models.Model):

  header_image = models.ImageField(default='ancean-no-header-image.png')
  title = models.CharField(max_length=100)
  introduce = models.TextField(default='')
  content = models.JSONField('json', null=True, blank=True)
  author = models.ForeignKey(
    User,
    on_delete=models.CASCADE,
    db_column="author",
    to_field="name",
    related_name='author'
  )
  category = models.ForeignKey(
    Category,
    on_delete=models.SET_NULL,
    db_column="category",
    to_field="name",
    related_name='posts',
    null=True,
    blank=True
  )
  wave = models.IntegerField(default=0)  # wave field like 'like post' on general SNS
  created_at = models.DateTimeField(null=True)
  updated_at = models.DateTimeField(auto_now=True)
  is_finish = models.BooleanField(default=False)
  is_public = models.BooleanField(default=False)

  def __str__(self):
    return f'{self.title} - {self.author}'

  def get_image_storage_path(self):
    return os.path.join(self.author.get_image_storage_path(), str(self.id))

  def create_image_storage(self):
    '''
    Create a folder to store the images associated with the post that was created.
    '''
    try:
      os.mkdir(self.get_image_storage_path())
    except FileExistsError:
      raise ValidationError(
        "Post image storage(path: %(path)s) already exists.",
        code="already_exists",
        params={"path": self.get_image_storage_path()}
        )

  def delete_image_storage(self):
    '''
    Remove the image storage folder for the post to delete.
    '''
    shutil.rmtree(self.get_image_storage_path(), ignore_errors=True)

  def delete(self, using=None, keep_parents=False):
    self.delete_image_storage()
    return super().delete(using, keep_parents)
