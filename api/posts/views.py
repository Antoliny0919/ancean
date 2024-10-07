import django_filters
from django.core import exceptions
from django.db.models import Q
from django.http import Http404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import exceptions, filters, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Post
from .permissions import IsWriter, PrivatePostPermission
from .serializers import PostSerializer


class PostFilter(django_filters.FilterSet):

  category__name = django_filters.CharFilter(lookup_expr="iexact")
  author__name = django_filters.CharFilter(lookup_expr="iexact")
  is_finish = django_filters.BooleanFilter()


class PostViewSet(viewsets.ModelViewSet):
  queryset = Post.objects.all()

  serializer_class = PostSerializer
  permission_classes = [IsWriter, PrivatePostPermission]
  authentication_classes = [JWTAuthentication]
  filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
  filterset_class = PostFilter
  ordering_fields = ['wave', 'created_at']

  def permission_denied(self, request, message=None, code=None):
    """
    If request is not permitted, determine what kind of exception to raise.
    """
    raise exceptions.PermissionDenied(detail=message, code=code)

  def list(self, request, *args, **kwargs):
    # It does not include private posts from other users.
    self.queryset = self.queryset.filter(is_finish=True).exclude(
      ~Q(author=request.user) & Q(is_public=False)
    )
    return super().list(request, args, kwargs)

  def retrieve(self, request, *args, **kwargs):
    try:
      return super().retrieve(request, args, kwargs)
    except Http404:
      raise Http404("Post not found.")

  @action(detail=False, permission_classes=[])
  def none_finish_list(self, request):
    # Get posts with is_finish false among the posters owned by the writer.
    posts = self.queryset.filter(is_finish=False, author=request.user)
    serializer = self.get_serializer(posts, many=True)
    return Response(serializer.data)
