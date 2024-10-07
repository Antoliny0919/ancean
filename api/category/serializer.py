from rest_framework import serializers

from .models import Category


class CategorySerializer(serializers.ModelSerializer):

  post_count = serializers.IntegerField()

  class Meta:
    model = Category
    fields = ('name', 'post_count')
