from django.contrib import admin
from users.models import UserModel, UserProfile

admin.site.register(UserModel)
admin.site.register(UserProfile)
