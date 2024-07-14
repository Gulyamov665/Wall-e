from rest_framework.viewsets import ModelViewSet
from checklist.models import Product
from checklist.serializers.product_serializer import ProductSerializers
from rest_framework import parsers


class ProductView(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers
    parser_classes = [parsers.JSONParser, parsers.FormParser, parsers.MultiPartParser]
    lookup_field = "id"