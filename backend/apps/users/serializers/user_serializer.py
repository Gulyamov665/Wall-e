from datetime import datetime, timedelta
import random
from django.conf import settings
from rest_framework import serializers
from users.models import UserModel
from users.utils.send_email import send_verification_code
from django.utils import timezone



class UserModelSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(
        write_only = True,
        min_length=settings.PASSWORD_MIN_LENGHT,
        error_messages={
            "min_length": f"Password must be longer than {settings.PASSWORD_MIN_LENGHT} characters"
        },
    )
    password2 = serializers.CharField(
        write_only = True,
        min_length=settings.PASSWORD_MIN_LENGHT,
        error_messages={
            "min_length": f"Password must be longer than {settings.PASSWORD_MIN_LENGHT} characters"
        },
    )

    class Meta:
        model = UserModel
        fields = ['id','email', "phone", "password1", "password2"]
        read_only_fields = ('id',)


    def validate(self, data):
        if data["password1"] != data["password2"]:
            raise serializers.ValidationError("Пароли не совпадають")
        return data
    
    def create(self, validated_data):
        code = random.randint(1000, 9999)
        code_expiry = timezone.now() + timedelta(seconds=1)
        user = UserModel.objects.create(
            email = validated_data["email"],
            phone = validated_data["phone"],
            code = code,
            code_expiry = code_expiry,
            max_code_try = settings.MAX_CODE_TRY,
        )
        user.set_password(validated_data["password1"])
        user.save()
        send_verification_code(validated_data["email"], code)
        return user
    
