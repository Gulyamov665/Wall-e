from rest_framework.viewsets import ModelViewSet
from checklist.models import Brand
from checklist.serializers.brand_serializer import BrandSerializers
from rest_framework import parsers


class BrandView(ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializers
    parser_classes = [parsers.JSONParser, parsers.FormParser, parsers.MultiPartParser]
    lookup_field = "id"