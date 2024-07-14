from rest_framework import serializers
from tasks.models import TaskComments, CommentImages
from users.serializers.user_profile import UserProfileSerializer
from tasks.utils.images_create import images_create
from users.serializers.user_profile import UserProfileSerializer
from checklist.models import Product, Checklist
from checklist.serializers.checklist_serializer import ChecklistSerializers


class CommentImagesSerializer(serializers.ModelSerializer):
    # created_by = serializers.CharField(default=serializers.CurrentUserDefault())
    # updated_by = serializers.CharField(default=serializers.CurrentUserDefault())

    class Meta:
        model = CommentImages
        fields = "__all__"


class TaskCommentsSerializer(serializers.ModelSerializer):
    # created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    # updated_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    creator = serializers.SerializerMethodField()
    comment_image = CommentImagesSerializer(read_only=True, many=True, allow_null=True)
    uploaded_images = serializers.ListField(
        child=serializers.FileField(allow_empty_file=True, use_url=True),
        write_only=True,
        required=False,
    )
    checklist = ChecklistSerializers(many=True)

    class Meta:
        model = TaskComments
        fields = [
            "id",
            "task",
            "comment",
            "creator",
            "created_at",
            "comment_image",
            "uploaded_images",
            # "created_by",
            # "updated_by",
            "checklist"
        ]

    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images", None)
        checklist_data = validated_data.pop("checklist", [])
        comment = TaskComments.objects.create(**validated_data)
        images_create(uploaded_images, comment, CommentImages)
        
        checklist_items = []
        for item in checklist_data:
            product = Product.objects.get(id=item["product"].id)
            checklist_item = Checklist.objects.create(
                product=product,
                task_id=comment.task,
                task_comment=comment,
                is_checked=item["is_checked"]
            )
            checklist_items.append(checklist_item)
        
        comment.checklist.set([item.id for item in checklist_items])
        
        return comment


    def get_creator(self, instance):
        if instance.created_by and hasattr(instance.created_by, "profile"):
            request = self.context.get("request", None)
            if request:
                context = {"request": request}
                return UserProfileSerializer(
                    instance.created_by.profile, context=context
                ).data
            return UserProfileSerializer(instance.created_by.profile).data
        return None
