from django.db.models import Count, Q
from rest_framework.filters import OrderingFilter
from rest_framework.generics import ListAPIView

from .models import Category
from .serializer import CategorySerializer


class CategoryView(ListAPIView):
  '''
  get categories in the order of many posters by category
  '''

  queryset = Category.objects.annotate(
    post_count=Count('posts', filter=Q(posts__is_finish=True))
  ).order_by('-post_count')
  serializer_class = CategorySerializer
  filter_backends = [OrderingFilter]
  ordering_fields = ['post_count']
  authentication_classes = []
