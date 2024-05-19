from rest_framework.viewsets import ModelViewSet
from rest_framework import parsers
from tasks.models import Classification
from tasks.serializers.classification_serializer import ClassificationSerializer
from apps.tasks.pagination.pagination import CustomPagination


class ClassificationView(ModelViewSet):
    queryset = Classification.objects.all()
    serializer_class = ClassificationSerializer
    parser_classes = [parsers.JSONParser, parsers.FormParser, parsers.MultiPartParser]
    pagination_class = CustomPagination
    lookup_field = "pk"
