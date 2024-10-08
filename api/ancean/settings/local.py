import os

from .base import *

ALLOWED_HOSTS = ["*"]
DEBUG = True

CORS_ORIGIN_ALLOW_ALL = True

CORS_ALLOW_CREDENTIALS = True

SERVER_URI = "http://localhost:8000"

DEFAULT_IMAGE_ROOT = f"{SERVER_URI}/media/ancean-no-header-image.png"

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR / 'db.sqlite3'),
    }
}
