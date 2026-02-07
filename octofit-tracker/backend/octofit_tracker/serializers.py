from rest_framework import serializers

from .models import Activity, LeaderboardEntry, Team, UserProfile, Workout


class ObjectIdModelSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="_id", read_only=True)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if data.get("id") is not None:
            data["id"] = str(data["id"])
        return data


class UserProfileSerializer(ObjectIdModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["id", "username", "email", "display_name", "created_at"]


class TeamSerializer(ObjectIdModelSerializer):
    members = serializers.PrimaryKeyRelatedField(
        many=True, queryset=UserProfile.objects.all(), required=False
    )

    class Meta:
        model = Team
        fields = ["id", "name", "description", "members", "created_at"]


class ActivitySerializer(ObjectIdModelSerializer):
    class Meta:
        model = Activity
        fields = [
            "id",
            "user",
            "activity_type",
            "duration_minutes",
            "calories_burned",
            "logged_at",
            "notes",
        ]


class LeaderboardEntrySerializer(ObjectIdModelSerializer):
    class Meta:
        model = LeaderboardEntry
        fields = ["id", "user", "points", "rank", "period", "updated_at"]


class WorkoutSerializer(ObjectIdModelSerializer):
    class Meta:
        model = Workout
        fields = [
            "id",
            "title",
            "description",
            "difficulty",
            "duration_minutes",
            "created_at",
            "suggested_for",
        ]
