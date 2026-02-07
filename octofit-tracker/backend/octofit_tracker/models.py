from djongo import models


class UserProfile(models.Model):
    _id = models.ObjectIdField(primary_key=True, editable=False)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    display_name = models.CharField(max_length=150, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "users"

    def __str__(self):
        return self.display_name or self.username


class Team(models.Model):
    _id = models.ObjectIdField(primary_key=True, editable=False)
    name = models.CharField(max_length=120, unique=True)
    description = models.TextField(blank=True)
    members = models.ManyToManyField(UserProfile, related_name="teams", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "teams"

    def __str__(self):
        return self.name


class Activity(models.Model):
    _id = models.ObjectIdField(primary_key=True, editable=False)
    user = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="activities"
    )
    activity_type = models.CharField(max_length=120)
    duration_minutes = models.PositiveIntegerField()
    calories_burned = models.PositiveIntegerField(default=0)
    logged_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)

    class Meta:
        db_table = "activities"

    def __str__(self):
        return f"{self.user} - {self.activity_type}"


class LeaderboardEntry(models.Model):
    _id = models.ObjectIdField(primary_key=True, editable=False)
    user = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="leaderboard_entries"
    )
    points = models.PositiveIntegerField(default=0)
    rank = models.PositiveIntegerField(default=0)
    period = models.CharField(max_length=40, default="weekly")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "leaderboard"

    def __str__(self):
        return f"{self.user} - {self.points}"


class Workout(models.Model):
    _id = models.ObjectIdField(primary_key=True, editable=False)
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    difficulty = models.CharField(max_length=40, default="beginner")
    duration_minutes = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    suggested_for = models.ForeignKey(
        UserProfile,
        on_delete=models.SET_NULL,
        related_name="suggested_workouts",
        blank=True,
        null=True,
    )

    class Meta:
        db_table = "workouts"

    def __str__(self):
        return self.title
