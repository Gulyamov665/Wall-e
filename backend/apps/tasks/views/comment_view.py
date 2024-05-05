from rest_framework.viewsets import ModelViewSet
from rest_framework import parsers
from django_filters import rest_framework as filters
from tasks.filters.comment_filter import CommentFilter
from tasks.models import TaskComments
from tasks.serializers.comment_serializer import TaskCommentsSerializer


class TaskCommentView(ModelViewSet):
    queryset = TaskComments.objects.all()
    serializer_class = TaskCommentsSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CommentFilter
    parser_classes = [parsers.JSONParser, parsers.FormParser, parsers.MultiPartParser]
    lookup_field = "pk"
