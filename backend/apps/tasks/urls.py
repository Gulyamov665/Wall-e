from django.urls import path
from rest_framework.routers import DefaultRouter
from tasks.views.classification import ClassificationView
from tasks.views.task import TaskView 

router = DefaultRouter()

router = DefaultRouter()
router.register(r'classification', ClassificationView, basename='classification')
router.register(r'tasks', TaskView, basename='tasks')

urlpatterns = router.urls
