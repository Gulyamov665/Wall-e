from rest_framework import serializers
from tasks.models import TaskImages
from tasks.utils.images_create import images_create
from rest_framework.response import Response


class TaskImagesSerializer(serializers.ModelSerializer):
    uploaded_images = serializers.ListField(
        child=serializers.FileField(allow_empty_file=True, use_url=True),
        write_only=True,
        required=False,
    )

    class Meta:
        model = TaskImages
        fields = ["id", "task", "image", "uploaded_images"]
        read_only_fields = ["image"]

    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        task_id = validated_data.pop("task")
        data = images_create(uploaded_images, task_id, TaskImages)
        return Response({"message": data})
