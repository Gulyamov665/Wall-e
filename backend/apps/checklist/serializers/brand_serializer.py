from rest_framework import serializers
from checklist.models import Brand


class BrandSerializers(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ["name"]