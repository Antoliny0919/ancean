import os
import shutil

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.exceptions import ValidationError
from django.db import models

from .managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):

  objects = CustomUserManager()
  email = models.EmailField(max_length=255, unique=True)
  name = models.CharField(max_length=20, unique=True)
  introduce = models.CharField(max_length=255, null=True)
  is_writer = models.BooleanField(
    default=False,
    help_text=("Specifies whether the user has permissions to work with the post.")
  )
  is_staff = models.BooleanField(
    default=False,
    help_text=("Designates whether the user can log into this admin site."),
  )
  is_active = models.BooleanField(
    default=True,
    help_text=(
        "Designates whether this user should be treated as active. "
        "Unselect this instead of deleting accounts."
    ),
  )

  USERNAME_FIELD = 'email'

  REQUIRED_FIELDS = ['name']

  class Meta:
    app_label = 'users'

  def __str__(self):
    return self.name

  def get_image_storage_path(self):
    return os.path.join(getattr(settings, 'MEDIA_ROOT'), self.name)

  def create_image_storage(self):
    """
    Create a folder to store user-generated images with the MEDIA_ROOT/username path.
    """
    try:
      os.mkdir(self.get_image_storage_path())
    except FileExistsError:
      raise ValidationError(
        "User image storage(path: %(path)s) already exists.",
        code="already_exists",
        params={"path": self.get_image_storage_path()}
      )

  def delete_image_storage(self):
    """
    Remove the image storage folder that user used.
    """
    shutil.rmtree(self.get_image_storage_path(), ignore_errors=True)

  def delete(self, using=None, keep_parents=False):
    self.delete_image_storage()
    return super().delete(using, keep_parents)
