from rest_framework.viewsets import ModelViewSet
from rest_framework import parsers
from tasks.models import Classification
from tasks.serializers.classification_serializer import ClassificationSerializer


class ClassificationView(ModelViewSet):
    queryset = Classification.objects.all()
    serializer_class = ClassificationSerializer
    parser_classes = [parsers.JSONParser, parsers.FormParser, parsers.MultiPartParser]
    lookup_field = "pk"
