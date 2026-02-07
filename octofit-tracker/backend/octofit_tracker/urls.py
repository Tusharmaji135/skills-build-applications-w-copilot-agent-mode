import os

from django.contrib import admin
from django.urls import include, path
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.routers import DefaultRouter

from .views import (
    ActivityViewSet,
    LeaderboardEntryViewSet,
    TeamViewSet,
    UserProfileViewSet,
    WorkoutViewSet,
)


CODESPACE_NAME = os.environ.get("CODESPACE_NAME")
if CODESPACE_NAME:
    base_url = f"https://{CODESPACE_NAME}-8000.app.github.dev"
else:
    base_url = "http://localhost:8000"

router = DefaultRouter()
router.register(r"users", UserProfileViewSet, basename="users")
router.register(r"teams", TeamViewSet, basename="teams")
router.register(r"activities", ActivityViewSet, basename="activities")
router.register(r"leaderboard", LeaderboardEntryViewSet, basename="leaderboard")
router.register(r"workouts", WorkoutViewSet, basename="workouts")


@api_view(["GET"])
def api_root(request):
    api_base = base_url
    return Response(
        {
            "users": f"{api_base}{reverse('users-list')}",
            "teams": f"{api_base}{reverse('teams-list')}",
            "activities": f"{api_base}{reverse('activities-list')}",
            "leaderboard": f"{api_base}{reverse('leaderboard-list')}",
            "workouts": f"{api_base}{reverse('workouts-list')}",
        }
    )


urlpatterns = [
    path("", api_root, name="api-root-root"),
    path("admin/", admin.site.urls),
    path("api/", api_root, name="api-root"),
    path("api/", include(router.urls)),
]
