from rest_framework import serializers
from tasks.models import Task, TaskImages, TaskComments
from tasks.utils.images_create import images_create
from tasks.serializers.comment_serializer import TaskCommentsSerializer
from rest_framework.response import Response


class TaskImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskImages
        fields = "__all__"


class TaskSerializer(serializers.ModelSerializer):
    task_images = TaskImagesSerializer(many=True, read_only=True, allow_null=True)
    uploaded_images = serializers.ListField(
        child=serializers.FileField(allow_empty_file=True, use_url=True),
        write_only=True,
        required=False,
    )

    class Meta:
        model = Task
        fields = [
            "id",
            "name",
            "start_time",
            "dead_line",
            "status",
            "executor",
            "observers",
            "comments",
            "priority",
            "classification",
            "task_images",
            "uploaded_images",
        ]

    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images", None)
        observers = validated_data.pop("observers")
        task = Task.objects.create(**validated_data)
        images_create(uploaded_images, task, TaskImages)
        if observers:
            task.observers.set(observers)
        return task

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        comment = TaskComments.objects.filter(task_id=instance.id)
        representation["task_comment"] = TaskCommentsSerializer(comment, many=True).data
        return representation