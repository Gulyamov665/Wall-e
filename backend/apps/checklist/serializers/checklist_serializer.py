from rest_framework import serializers
from checklist.models import Checklist
from checklist.models import Product


class ChecklistSerializers(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = Checklist
        fields = ["id", "product", "task_id", "task_comment", "is_checked", "timestamp"]