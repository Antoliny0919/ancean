from rest_framework import status, views
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import ImageSerializer


class ImageView(views.APIView):

  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAdminUser]

  def post(self, request):
    '''
    save the image requested  by the user
    path design --> '/ancean/media/{user_name}/{post_number(id)}/{file_name}'
    the id value of the post is required to save the image
    (it's mean image save only when post is created)
    '''
    data = request.data
    kwargs = {'file': data.get('file'), 'id': data.get('id'), 'name': request.user.name}
    serializer = ImageSerializer(data=kwargs)
    if serializer.is_valid():
      response = serializer.save()
      return Response(response, status=status.HTTP_200_OK)
    else:
      return Response({'detail': '이미지를 생성할 수 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
