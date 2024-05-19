from django.contrib import admin
from django.urls import path, include
from apps.users.views import user_views, user_profile
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from rest_framework_simplejwt.serializers import TokenVerifySerializer
from apps.tasks.views.task import LogEntryView, get_status_and_priority
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path(
        "api/v1/",
        include(
            [
                path("", include("tasks.urls")),
                path("", include("users.urls")),
                path("status/", get_status_and_priority, name="status-list"),
                path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
                path(
                    "token/refresh/", TokenRefreshView.as_view(), name="token_refresh"
                ),
            ]
        ),
    ),
    path("api/log/", LogEntryView.as_view({"get": "list"}), name="log-list"),
    path(
        "api/log/<int:object_id>",
        LogEntryView.as_view({"get": "with_object_id"}),
        name="log-object-list",
    ),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
