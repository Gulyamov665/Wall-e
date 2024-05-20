from rest_framework import serializers
from tasks.models import Classification


class ClassificationSerializer(serializers.ModelSerializer):
    # created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    # updated_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Classification
        fields = "__all__"
