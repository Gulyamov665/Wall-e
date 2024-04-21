from django.contrib import admin
from django.urls import path, include
from apps.users.views import user_views, user_profile
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from rest_framework_simplejwt.serializers import TokenVerifySerializer



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # Custom user path
    path("api/user/", user_views.UserView.as_view({"post":"create"}), name="user-create"),
    path("api/user/", user_views.UserView.as_view({"get":"list"}), name="user-list"),
    path("api/user/<int:pk>", user_views.UserView.as_view({"get":"retrieve"}), name="user-list"),
    path("api/user/<int:pk>/delete", user_views.UserView.as_view({"delete":"destroy"}), name="user-delete"),
    path("api/user/<int:pk>/verify", user_views.UserView.as_view({"patch":"verify_code"}), name="user-verify"),
    path("api/user/<int:pk>/regenerate", user_views.UserView.as_view({"patch":"regenerate_otp"}), name="user-regenerate-code"),

    # Custom userprofile path
    # path("api/user/profile", user_profile.UserProfileView.as_view({"post":"create"}), name="user-profile-create"),
    path("api/user/profile", user_profile.UserProfileView.as_view({"get":"list"}), name="user-profiles-list"),
    path("api/user/profile/<int:pk>", user_profile.UserProfileView.as_view({"get":"retrieve"}), name="user-profile-get"),
    path("api/user/profile/<int:pk>/update", user_profile.UserProfileView.as_view({"put":"partial_update"}), name="user-profile-update"),
    path("api/user/profile/<int:pk>", user_profile.UserProfileView.as_view({"delete":"destroy"}), name="user-profile-delete"),


]
