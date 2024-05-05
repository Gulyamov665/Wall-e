from django.urls import path
from rest_framework.routers import DefaultRouter
from tasks.views.classification import ClassificationView
from tasks.views.task import TaskView
from tasks.views.task_images import TaskImagesView
from tasks.views.comment_view import TaskCommentView

router = DefaultRouter()

router = DefaultRouter()
router.register(r"classification", ClassificationView, basename="classification")
router.register(r"tasks", TaskView, basename="tasks")
router.register(r"tasks-images", TaskImagesView, basename="task-images")
router.register(r"tasks-comments", TaskCommentView, basename="task-comments")


urlpatterns = router.urls
