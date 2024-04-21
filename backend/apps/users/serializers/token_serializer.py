from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['is_ative'] = user.is_active
        token['is_staff'] = user.is_staff
        token['is_manager'] = user.is_manager
        token['is_supervisor'] = user.is_supervisor

        return token