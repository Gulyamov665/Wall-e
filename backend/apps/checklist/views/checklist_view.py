from rest_framework.viewsets import ModelViewSet
from checklist.models import Checklist
from checklist.serializers.checklist_serializer import ChecklistSerializers
from rest_framework import parsers


class ChecklistView(ModelViewSet):
    queryset = Checklist.objects.all()
    serializer_class = ChecklistSerializers
    parser_classes = [parsers.JSONParser, parsers.FormParser, parsers.MultiPartParser]
    lookup_field = "id"