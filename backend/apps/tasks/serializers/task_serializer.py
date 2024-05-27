from auditlog.models import LogEntry
from rest_framework import serializers
from rest_framework.response import Response
from tasks.serializers.comment_serializer import TaskCommentsSerializer
from users.serializers.user_profile import UserProfileSerializer
from tasks.models import Task, TaskImages, TaskComments
from tasks.utils.images_create import images_create

user_id = 24055436
users_id = [
    24055436,
    5092708098,
    -974972939,
]


class LogEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = LogEntry
        fields = ["id", "object_id", "timestamp", "changes"]


class TaskImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskImages
        fields = "__all__"


class TaskSerializer(serializers.ModelSerializer):
    # created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    # updated_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    task_images = TaskImagesSerializer(many=True, read_only=True, allow_null=True)
    uploaded_images = serializers.ListField(
        child=serializers.FileField(allow_empty_file=True, use_url=True),
        write_only=True,
        required=False,
    )
    executor_profile = serializers.SerializerMethodField()
    observers_profile = serializers.SerializerMethodField()
    classification_name = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = [
            "id",
            # "created_by",
            # "updated_by",
            "created_at",
            "name",
            "start_time",
            "dead_line",
            "status",
            "executor",
            "observers",
            "comments",
            "priority",
            "classification",
            "classification_name",
            "task_images",
            "uploaded_images",
            "executor_profile",
            "observers_profile",
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

    def get_classification_name(self, obj):
        return obj.classification.name if obj.classification else None

    def get_executor_profile(self, instance):
        if instance.executor and hasattr(instance.executor, "profile"):
            request = self.context.get("request", None)
            if request:
                context = {"request": request}
                return UserProfileSerializer(
                    instance.executor.profile, context=context
                ).data
            return UserProfileSerializer(instance.executor.profile).data
        return None

    def get_observers_profile(self, instance):
        observers = instance.observers.all()
        observers_profile = []
        for observer in observers:
            if observer and hasattr(observer, "profile"):
                request = self.context.get("request", None)
                context = {"request": request}
                observers_profile.append(
                    UserProfileSerializer(observer.profile, context=context).data
                )
            else:
                return observers_profile.append(
                    UserProfileSerializer(observer.profile).data
                )
        return observers_profile
