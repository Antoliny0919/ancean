from django.urls import path

from . import views

urlpatterns = [
  path('users/', views.UserView.as_view(), name="get_user_detail")
]
