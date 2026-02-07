from django.core.management.base import BaseCommand

from octofit_tracker.models import (
    Activity,
    LeaderboardEntry,
    Team,
    UserProfile,
    Workout,
)


class Command(BaseCommand):
    help = "Populate the database with initial Octofit Tracker data."

    def handle(self, *args, **options):
        users = [
            UserProfile.objects.get_or_create(
                username="octo_amy",
                defaults={
                    "email": "amy@example.com",
                    "display_name": "Amy Rider",
                },
            )[0],
            UserProfile.objects.get_or_create(
                username="octo_max",
                defaults={
                    "email": "max@example.com",
                    "display_name": "Max Sprint",
                },
            )[0],
            UserProfile.objects.get_or_create(
                username="octo_lee",
                defaults={
                    "email": "lee@example.com",
                    "display_name": "Lee Pace",
                },
            )[0],
        ]

        team, _ = Team.objects.get_or_create(
            name="OctoFit Crew",
            defaults={"description": "Community training team."},
        )
        team.members.set(users)

        Activity.objects.get_or_create(
            user=users[0],
            activity_type="Run",
            duration_minutes=35,
            defaults={"calories_burned": 320, "notes": "Morning tempo run."},
        )
        Activity.objects.get_or_create(
            user=users[1],
            activity_type="Bike",
            duration_minutes=50,
            defaults={"calories_burned": 420, "notes": "Intervals."},
        )
        Activity.objects.get_or_create(
            user=users[2],
            activity_type="Yoga",
            duration_minutes=40,
            defaults={"calories_burned": 160, "notes": "Recovery flow."},
        )

        LeaderboardEntry.objects.get_or_create(
            user=users[0],
            defaults={"points": 120, "rank": 1, "period": "weekly"},
        )
        LeaderboardEntry.objects.get_or_create(
            user=users[1],
            defaults={"points": 95, "rank": 2, "period": "weekly"},
        )
        LeaderboardEntry.objects.get_or_create(
            user=users[2],
            defaults={"points": 80, "rank": 3, "period": "weekly"},
        )

        Workout.objects.get_or_create(
            title="Starter Strength",
            defaults={
                "description": "Full body circuit with low impact moves.",
                "difficulty": "beginner",
                "duration_minutes": 25,
                "suggested_for": users[0],
            },
        )
        Workout.objects.get_or_create(
            title="Tempo Builder",
            defaults={
                "description": "Intervals to build aerobic endurance.",
                "difficulty": "intermediate",
                "duration_minutes": 35,
                "suggested_for": users[1],
            },
        )

        self.stdout.write(self.style.SUCCESS("Octofit Tracker data populated."))
