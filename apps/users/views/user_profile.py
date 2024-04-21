from rest_framework import viewsets
from users.serializers.user_profile import UserProfileSerializer
from users.models import UserProfile


class UserProfileView(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'pk'
