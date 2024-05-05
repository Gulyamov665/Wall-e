from rest_framework.viewsets import ModelViewSet
from rest_framework import parsers
from tasks.models import TaskComments
from tasks.serializers.comment_serializer import TaskCommentsSerializer


class TaskCommentView(ModelViewSet):
    queryset = TaskComments.objects.all()
    serializer_class = TaskCommentsSerializer
    parser_classes = [parsers.JSONParser, parsers.FormParser, parsers.MultiPartParser]
    lookup_field = "pk"
