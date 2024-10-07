from django.contrib import admin

from .models import Post


class CustomPostAdmin(admin.ModelAdmin):
  readonly_fields = ('updated_at',)
  fieldsets = (
    (("Header"), {"fields": ("title", "header_image",)}),
    (("Body"), {"fields": ("introduce", "content", "author", "category", "wave",)}),
    (("State"), {"fields": ("is_finish", "is_public",)}),
    (("Date"), {"fields": ("created_at", "updated_at")}),
  )


admin.site.register(Post, CustomPostAdmin)
