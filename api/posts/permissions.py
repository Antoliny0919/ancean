from rest_framework.permissions import (SAFE_METHODS, BasePermission,
                                        IsAuthenticated)


class IsWriter(IsAuthenticated):

  def has_permission(self, request, view):
    self.message = "Permission does not exist."

    if request.method in SAFE_METHODS:
      return True

    if super().has_permission(request, view):
      user = request.user
      return user.is_writer

    return False

  def has_object_permission(self, request, view, obj):

    if request.method in SAFE_METHODS:
      return True

    self.message = f"The {request.method} request is only allowed for owner {obj.author}."
    user = request.user

    if bool(user and user.is_staff):
      return True

    is_owner = (user == obj.author)
    return is_owner


class PrivatePostPermission(BasePermission):

  def has_object_permission(self, request, view, obj):
    self.message = "This is a private post"

    if request.method not in SAFE_METHODS:
      return True

    if not obj.is_public:
      if request.user != obj.author:
        return False

    return True
