from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import UserManager


class CustomUserManager(UserManager):

  def _create_user(self, email, name, password, **extra_fields):
    """
    Create and save a user with the given email, name, and password.
    """
    if not email and name:
      raise ValueError("The given email, name must be set")
    email = self.normalize_email(email)
    user = self.model(email=email, name=name, **extra_fields)
    user.password = make_password(password)
    user.save(using=self._db)
    user.create_image_storage()
    return user

  def create_user(self, email, name, password, **extra_fields):
    extra_fields.setdefault("is_writer", False)
    user = super().create_user(email, name, password, **extra_fields)
    return user

  def create_superuser(self, email, name, password, **extra_fields):
    extra_fields.setdefault("is_writer", True)
    user = super().create_superuser(email, name, password, **extra_fields)
    return user
