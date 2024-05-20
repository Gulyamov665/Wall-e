from rest_framework import serializers
from tasks.models import TaskImages
from tasks.utils.images_create import images_create
from rest_framework.response import Response


class TaskImagesSerializer(serializers.ModelSerializer):
    # created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    # updated_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    uploaded_images = serializers.ListField(
        child=serializers.FileField(allow_empty_file=True, use_url=True),
        write_only=True,
        required=False,
    )
    images = serializers.ListField(
        child = serializers.JSONField(),
        read_only=True
    )


    class Meta:
        model = TaskImages
        fields = ["id", "task", "uploaded_images", "images",]
        read_only_fields = ["image", "images"]

    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        task_id = validated_data.pop("task")
        data = images_create(uploaded_images, task_id, TaskImages)
        response_data = {
            "task": task_id,
            "images": [
                {"id": image.id, "image": image.image.url} for image in data
            ]
        }
        return response_data
    
    def get_images(self, obj):
        return [{"id": obj.id, "image": obj.image.url}]

    

