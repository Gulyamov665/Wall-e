from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework import parsers
from django_filters import rest_framework as filters
from tasks.models import Task
from rest_framework.response import Response
from tasks.serializers.task_serializer import TaskSerializer, LogEntrySerializer
from tasks.filters.task_filter import TaskFilter
from auditlog.models import LogEntry


class TaskView(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    parser_classes = [parsers.JSONParser, parsers.FormParser, parsers.MultiPartParser]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = TaskFilter
    lookup_field = "pk"


class LogEntryView(ReadOnlyModelViewSet):
    queryset = LogEntry.objects.all()
    serializer_class = LogEntrySerializer

    def with_object_id(self, request,*args, **kwargs):
        object_id = kwargs["object_id"]
        serializer = self.serializer_class(LogEntry.objects.filter(object_id=object_id), many=True)
        return Response({"log datas": serializer.data}) 
