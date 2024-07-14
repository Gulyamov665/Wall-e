from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from users.serializers.reset_password import SendCodeSerializer
from users.models import UserModel
from django.core.cache import cache
import random
import requests
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


def send_code_via_telegram(chat_id, code):
    url = "https://0c77-84-54-82-236.ngrok-free.app/send_code/"
    msg = code
    headers = {
        'Content-Type': 'application/json'
    }

    data = {"chat_id": chat_id,
            "message": msg
            }
    
    response = requests.post(url, headers=headers, data=json.dumps(data))
    print(response.status_code, response.text)  # Для отладки



class SendCodeView(APIView):

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        serializer = SendCodeSerializer(data=request.data)
        if serializer.is_valid():
            number = serializer.validated_data['number']
            try:
                user = UserModel.objects.get(phone=number)
                chat_id = user.chat_id
            except UserModel.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

            # Генерация и сохранение кода
            code = random.randint(1000, 9999)
            cache.set(f'password_reset_code_{number}', code, timeout=300)  # Код действителен 5 минут

            # Отправка кода через Telegram
            send_code_via_telegram(chat_id, code)

            return Response({"message": "Прверочный код успешно отправлен"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

