from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'posts', views.PostViewSet, basename='post')

urlpatterns = [
  path(
    "posts/none_finish/",
    views.PostViewSet.as_view(({"get": "none_finish_list"})),
    name="none_finish_posts_list"
  )
]

urlpatterns += router.urls
