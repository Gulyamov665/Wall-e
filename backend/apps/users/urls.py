from django.urls import path
from rest_framework.routers import DefaultRouter
from users.views.user_views import UserView
from users.views.user_profile import UserProfileView 

router = DefaultRouter()

router = DefaultRouter()
router.register(r"user", UserView, basename="user")
router.register(r"user-profile", UserProfileView, basename="user-profile")


urlpatterns = router.urls
