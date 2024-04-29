from rest_framework.serializers import ModelSerializer
from tasks.models import Classification


class ClassificationSerializer(ModelSerializer):
    class Meta:
        model = Classification
        fields = "__all__"
