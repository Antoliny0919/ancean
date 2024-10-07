# from django.test import TestCase

# from users.models import User

# class UserModelTest(TestCase):

#   @classmethod
#   def setUpTestData(cls):
#     tester = {"email": "tester1@gmail.com", "name": "tester1", "password": "1234"}
#     User.objects.create_user(**tester)

#   def setUp(self):
#     pass

#   def test_label(self):
#     user = User.objects.get(id=1)
#     field_label = user._meta.get_field("email").verbose_name
#     self.assertEquals(field_label, "email")

#   def test_magic_str(self):
#     user = User.objects.get(id=1)
#     expected_str_name = f'{user.name}'
#     self.assertEquals(expected_str_name, str(user))
