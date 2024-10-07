from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


class CustomUserAdmin(UserAdmin):
  list_display = ("name", "email", "is_active", "is_writer", "is_superuser")
  ordering = ("-is_staff", "-is_writer")
  add_fieldsets = (
    (
      None,
      {
        "classes": ("wide",),
        "fields": (
                    "name",
                    "email",
                    "password1",
                    "password2",
                    "introduce",
                    "is_active",
                    "is_writer",
                    "is_superuser"
                  ),
      },
    ),
  )
  fieldsets = (
    (("Personal info"), {"fields": ("name", "email", "password", "introduce")}),
    (("Permissions"), {"fields": ("is_active", "is_writer", "is_superuser")}),
    (("User Permissions"), {"fields": ("groups", "user_permissions")}),
  )

  def save_model(self, request, obj, form, change):
    # User.objects.create_image_storage(obj)
    super().save_model(request, obj, form, change)

  def delete_queryset(self, request, queryset):
    for user in queryset:
      self.delete_model(request, user)


admin.site.register(User, CustomUserAdmin)
