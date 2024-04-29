from rest_framework import serializers
from tasks.models import Task, TaskImages


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
        if uploaded_images:
            for image in uploaded_images:
                TaskImages.objects.create(task=task, image=image)
        if observers:
            task.observers.set(observers)
        return task
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.start_time = validated_data.get('start_time', instance.start_time)
        instance.dead_line = validated_data.get('dead_line', instance.dead_line)
        instance.status = validated_data.get('status', instance.status)
        instance.executor = validated_data.get('executor', instance.executor)
        instance.comments = validated_data.get('comments', instance.comments)
        instance.priority = validated_data.get('priority', instance.priority)
        instance.classification = validated_data.get('classification', instance.classification)
        observers = validated_data.get('observers')
        instance.observers.add(*observers)

        uploaded_images = validated_data.pop("uploaded_images", None)
        if uploaded_images:
            for image in uploaded_images:
                task = TaskImages.objects.filter(task=instance.id).update(image=image)

                print("%%%%%%%%%%%")
                print(task)
                print("%%%%%%%%%%%")

        instance.save()
        return instance
