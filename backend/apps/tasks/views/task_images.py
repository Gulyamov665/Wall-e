from rest_framework.viewsets import ModelViewSet
from rest_framework import parsers
from tasks.models import TaskImages
from tasks.serializers.task_images import TaskImagesSerializer


class TaskImagesView(ModelViewSet):
    queryset = TaskImages.objects.all()
    serializer_class = TaskImagesSerializer
    parser_classes = [parsers.JSONParser, parsers.FormParser, parsers.MultiPartParser]
    lookup_field = "pk"
