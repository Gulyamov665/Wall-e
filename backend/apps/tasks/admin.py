from django.contrib import admin
from tasks import models

admin.site.register(models.Classification)
admin.site.register(models.Task)
admin.site.register(models.TaskImages)
admin.site.register(models.TaskComments)
admin.site.register(models.Organization)
