from rest_framework import serializers
from checklist.models import Product


class ChecklistSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["product", "task_id", "task_comment", "is_checked", "timestamp"]