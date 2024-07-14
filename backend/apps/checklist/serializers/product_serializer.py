from rest_framework import serializers
from checklist.models import Product


class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "brand", "image"]