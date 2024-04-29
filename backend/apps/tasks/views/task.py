from rest_framework.viewsets import ModelViewSet
from rest_framework import parsers
from tasks.models import Task
from tasks.serializers.task_serializer import TaskSerializer


class TaskView(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    parser_classes = [parsers.JSONParser, parsers.FormParser, parsers.MultiPartParser]
    lookup_field = "pk"
