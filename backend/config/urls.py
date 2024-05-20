from django.contrib import admin
from django.urls import path, include
from apps.users.views import change_password
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from apps.tasks.views.task import LogEntryView, get_status_and_priority
from django.conf.urls.static import static
from django.conf import settings
from apps.tasks.views.comment_view import TaskCommentView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path("api/v1/", include([
        path("", include("tasks.urls")),
        path("", include("users.urls")),
        path('change-password', change_password.ChangePasswordView.as_view(), name="change-password"),
        path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
        path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
        path("status/", get_status_and_priority, name="status-list"),
    ])),


    path("api/task-comment/<int:task>/", TaskCommentView.as_view({"get":"list"}), name="task-comment"),

    path("api/log/", LogEntryView.as_view({"get":"list"}), name="log-list"),
    path("api/log/<int:object_id>", LogEntryView.as_view({"get":"with_object_id"}), name="log-object-list"),


]
