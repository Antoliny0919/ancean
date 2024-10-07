from .base import *

ALLOWED_HOSTS = ["*"]

# SECURITY WARNING: keep the secret key used in production secret!

DEBUG = True

CORS_ORIGIN_ALLOW_ALL = True

CORS_ALLOW_CREDENTIALS = True

DOMAIN = 'dltlehfld.iptime.org'

SERVER_URI = 'http://192.168.1.10'

MYSQL_SECRETS_COLLECTION = get_secret(django_secrets, "MYSQL")

CSRF_TRUSTED_ORIGINS = [
  'http://192.168.1.10',
  'https://dltlehfld.iptime.org',
  'http://dltlehfld.iptime.org',
]

MIDDLEWARE = [
  'django_prometheus.middleware.PrometheusBeforeMiddleware',
  'corsheaders.middleware.CorsMiddleware',
  'django.middleware.security.SecurityMiddleware',
  'django.contrib.sessions.middleware.SessionMiddleware',
  'django.middleware.common.CommonMiddleware',
  'django.middleware.csrf.CsrfViewMiddleware',
  'django.contrib.auth.middleware.AuthenticationMiddleware',
  'django.contrib.messages.middleware.MessageMiddleware',
  'django.middleware.clickjacking.XFrameOptionsMiddleware',
  'django_prometheus.middleware.PrometheusAfterMiddleware',
]

DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.mysql',
    'NAME': MYSQL_SECRETS_COLLECTION['MYSQL_DATABASE_NAME'],
    'USER': MYSQL_SECRETS_COLLECTION['MYSQL_USER'],
    'PASSWORD': MYSQL_SECRETS_COLLECTION['MYSQL_PASSWORD'],
    'HOST': MYSQL_SECRETS_COLLECTION['MYSQL_HOST'],
    'PORT': MYSQL_SECRETS_COLLECTION['MYSQL_PORT'],
  }
}
