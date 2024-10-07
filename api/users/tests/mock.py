from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from users.models import User

ADMIN_USER = {
  "name": "tester_admin",
  "email": "tester_admin@test.com",
  "password": "1234",
}

WRITER_USER = {
  "name": "tester_writer",
  "email": "tester_writer@test.com",
  "password": "1234",
  "is_writer": True
}

WRITER_USER2 = {
  "name": "tester_writer2",
  "email": "tester_writer2@test.com",
  "password": "1234",
  "is_writer": True
}

COMMON_USER = {
  "name": "tester_common",
  "email": "tester_common@test.com",
  "password": "1234",
}


class TestUserSet():

  def __init__(self, email, name, password, is_admin=False, is_anonymous=False, **kwargs):
    if is_admin:
      self.object = User.objects.create_superuser(
        email=email,
        name=name,
        password=password,
        **kwargs
      )
    else:
      self.object = User.objects.create_user(email=email, name=name, password=password, **kwargs)
    self.client = APIClient()
    access_token = self.set_access_token()
    if not is_anonymous:
      self.set_credentials(access_token)

  def set_access_token(self):
    refresh = RefreshToken().for_user(self.object)
    return str(refresh.access_token)

  def set_credentials(self, token):
    headers = {"content_type": "application/json", "HTTP_AUTHORIZATION": f"Bearer {token}"}
    self.client.credentials(**headers)
