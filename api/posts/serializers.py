from django.utils import timezone
from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):

  title = serializers.CharField()
  header_image = serializers.CharField(required=False)

  class Meta:
    model = Post
    fields = '__all__'

  def set_created_at(self, validated_data, instance=None):

    if validated_data.get("is_finish"):

      if instance is None or not getattr(instance, "is_finish"):
        validated_data["created_at"] = timezone.localtime()

  def validate(self, data):

    return data

  def create(self, validated_data):
    self.set_created_at(validated_data)
    post = Post.objects.create(**validated_data)
    post.create_image_storage()
    return post

  def update(self, instance, validated_data):
    if not instance.created_at:
      self.set_created_at(validated_data, instance)

    for field in validated_data:
      setattr(instance, field, validated_data[field])
    instance.save()
    return instance
