from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from rest_framework import parsers
from django_filters import rest_framework as filters
from tasks.models import Task, PRIORITY_TYPE, STATUS_TYPE
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


from django.http import JsonResponse

def get_status_and_priority(request):
    status_choices = [
        {"value": status[0], "label": status[1]} for status in STATUS_TYPE
    ]
    priority_choices = [
        {"value": priority[0], "label": priority[1]} for priority in PRIORITY_TYPE
    ]
    return JsonResponse({"status_choices": status_choices, "priority_choices": priority_choices})