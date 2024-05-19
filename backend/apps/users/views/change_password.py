'''
Change password logic
'''

from django.shortcuts import render
from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response
from apps.users.serializers.change_password import ChangePasswordSerializer


class ChangePasswordView(UpdateAPIView):
    serializer_class = ChangePasswordSerializer

    def update(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": f"Пароль для юзера {user.id} успешно изменён"})