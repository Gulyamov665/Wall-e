from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import password_validation
from django.conf import settings
from users.models import UserModel


'''
Change password logic
'''

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(min_length=settings.PASSWORD_MIN_LENGHT, error_messages={
                    "min_length": f"Пароль должен составить минимум {settings.PASSWORD_MIN_LENGHT} символов"
                    },
                    required = True,
                    write_only=True,
        )
    new_password1 = serializers.CharField(min_length=settings.PASSWORD_MIN_LENGHT, error_messages={
                        "min_length": f"Пароль должен составить минимум {settings.PASSWORD_MIN_LENGHT} символов"
                        },
                        required = True,
                        write_only=True,
    )
    new_password2 = serializers.CharField(
                    min_length=settings.PASSWORD_MIN_LENGHT,
                    error_messages={
                    "min_length": f"Пароль должен составить минимум {settings.PASSWORD_MIN_LENGHT} символов"
                    },
                    required = True,
                    write_only=True,
    )

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError(
                _('Старый пароль был введён некорректно. Пожалуйста попробуйте ещё раз.')
            )
        return value
    
    def validate(self, attrs):
        if attrs['new_password1'] != attrs['new_password2']:
            raise serializers.ValidationError({'new_password2': _("Пароли из поля new_password2 не совпадают")})
        elif attrs['old_password'] == attrs['new_password1']:
            raise serializers.ValidationError({'new_password1': _("Новый пароль не должен совпадать со старым паролем, придумайте новый пароль или идите нахуй ")})
            
        password_validation.validate_password(attrs['new_password1'], self.context['request'].user)
        return attrs
    
    def save(self, **kwargs):
        password = self.validated_data['new_password1']
        user = self.context['request'].user
        user.set_password(password)
        user.save()
        return user