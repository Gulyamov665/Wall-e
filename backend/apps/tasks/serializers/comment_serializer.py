from rest_framework import serializers
from tasks.models import TaskComments, CommentImages
from tasks.utils.images_create import images_create



class CommentImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentImages
        fields = "__all__"


class TaskCommentsSerializer(serializers.ModelSerializer ):
    comment_image = CommentImagesSerializer(read_only=True, many=True, allow_null=True)
    uploaded_images = serializers.ListField(
        child=serializers.FileField(allow_empty_file=True, use_url=True),
        write_only=True,
        required=False,
    )

    class Meta:
        model = TaskComments
        fields = ["id", "task", "comment", "comment_image", "uploaded_images"]

    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        comment = TaskComments.objects.create(**validated_data)

        images_create(uploaded_images, comment, CommentImages)

        return comment
