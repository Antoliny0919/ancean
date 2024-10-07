from django.test import TestCase
from django.urls import reverse
from rest_framework import status

from users.tests.mock import WRITER_USER, TestUserSet


class UserViewRetrieveTest(TestCase):

  def setUp(self):
    self.user = TestUserSet(**WRITER_USER)

  def tearDown(self):
    self.user.object.delete()

  def test_detail_info_test(self):
    user = self.user.object
    response = self.user.client.get(reverse('get_user_detail'))
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertDictEqual(response.data, {
      "id": user.id,
      "email": user.email,
      "name": user.name,
      "introduce": user.introduce,
      "is_staff": user.is_staff,
    })
