from rest_framework import status, views
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import UserModelSerializer


class UserView(views.APIView):

  authentication_classes = [JWTAuthentication]

  def get(self, request, *args, **kwargs):
    '''
    get data about users authenticated through tokens.
    '''
    user = request.user
    serializer = UserModelSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)
