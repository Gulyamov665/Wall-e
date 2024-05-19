from rest_framework import serializers
from users.models import UserProfile
from users.serializers.user_serializer import UserModelSerializer



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"
