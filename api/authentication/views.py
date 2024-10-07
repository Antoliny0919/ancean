import os

from django.conf import settings
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.views import TokenRefreshView, TokenViewBase


class CustomTokenViewBase(TokenViewBase):

  def finalize_response(self, request, response, *args, **kwargs):
    """
    Cookies have different attribute depending on server environment.
    """
    refresh_token = response.data['refresh']
    env = os.environ.get('DJANGO_SETTINGS_MODULE').split('.')[-1]
    if env == 'local':
      cookie_conf = {'httponly': False, 'secure': False, 'samesite': 'lax'}
    else:
      cookie_conf = {
        'domain': getattr(settings, 'DOMAIN'),
        'httponly': True, 'secure': True,
        'samesite': 'lax'
      }

    exp = getattr(settings, 'SIMPLE_JWT')['REFRESH_TOKEN_LIFETIME']
    exp_millisec = exp.total_seconds()

    response.set_cookie(
      'refresh',
      refresh_token,
      **cookie_conf,
      max_age=exp_millisec
    )

    return super().finalize_response(request, response, *args, **kwargs)


class CustomTokenObtainPairView(CustomTokenViewBase):

  _serializer_class = api_settings.TOKEN_OBTAIN_SERIALIZER


class CustomTokenRefreshView(TokenRefreshView):

  def post(self, request, *args, **kwargs):
      
    if refresh_from_header := request.COOKIES.get("refresh"):
      # For httponly cookies, it is passed through withCredential.
      # So extract the refresh token from the header and arbitrarily add it to the request body.
      request.data["refresh"] = refresh_from_header
    return super().post(request, args, kwargs)
