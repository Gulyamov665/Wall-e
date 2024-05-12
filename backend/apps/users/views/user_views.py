import datetime
import random
from django.conf import settings
from django.utils import timezone
from rest_framework import viewsets, decorators, response, status
from users.models import UserModel
from users.serializers.user_serializer import UserModelSerializer


class UserView(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer
    lookup_field = "pk"


    # ---#########################################---
    # ---######--- Logic OTP verification ---#####--- 
    # ---#########################################---
    
    # @decorators.action(detail=True, methods=["PATCH"])
    # def verify_code(self, request, pk=None):
    #     instance = self.get_object()

    #     if instance.code != request.data.get("code"):
    #         return response.Response({"message": "Указан неправилный проверочный код."})

    #     if timezone.now() >= instance.code_expiry:
    #         return response.Response({"message": "Срок действия кода истёк попробуйте запросить новый код"})

    #     if (
    #         not instance.is_active
    #         and instance.code == request.data.get("code")
    #         and instance.code_expiry
    #         and timezone.now() < instance.code_expiry
    #     ):
    #         instance.is_active = True
    #         instance.code_expiry = None
    #         instance.max_code_try = settings.MAX_CODE_TRY
    #         instance.code_max_out = None
    #         instance.save()
    #         return response.Response(
    #             "Пользователь успешно верифицорован.", status=status.HTTP_200_OK
    #         )
        
    
    # @decorators.action(detail=True, methods=["PATCH"])
    # def regenerate_otp(self, request, pk=None):
    #     instance = self.get_object()
    #     if int(instance.max_code_try) == 0 and timezone.now() < instance.code_max_out:
    #         return response.Response(
    #             "Вы много раз попросили код, попробуйте через час",
    #             status=status.HTTP_400_BAD_REQUEST,
    #         )

    #     code = random.randint(1000, 9999)
    #     code_expiry = timezone.now() + datetime.timedelta(minutes=10)
    #     max_code_try = int(instance.max_code_try) - 1

    #     instance.code = code
    #     instance.code_expiry = code_expiry
    #     instance.max_code_try = max_code_try
    #     if max_code_try == 0:
    #         code_max_out = timezone.now() + datetime.timedelta(hours=1)
    #         instance.code_max_out = code_max_out
    #     elif max_code_try == -1:
    #         instance.max_code_try = settings.MAX_CODE_TRY
    #     else:
    #         instance.code_max_out = None
    #         instance.max_code_try = max_code_try
    #     instance.save()
    #     # send_code(instance.phone, code)
    #     return response.Response("Проверочный код успешно пересоздан", status=status.HTTP_200_OK)

    # def get_allowed_methods(self):
    #     """
    #     Возвращает список разрешенных методов для представления.
    #     """
    #     allowed_methods = super().get_allowed_methods()
    #     allowed_methods.append("PATCH")
    #     return allowed_methods