from django.core.management.base import BaseCommand

from octofit_tracker.models import (
    Activity,
    LeaderboardEntry,
    Team,
    UserProfile,
    Workout,
)


class Command(BaseCommand):
    help = "Populate the octofit_db database with test data"

    def handle(self, *args, **options):
        users = [
            UserProfile.objects.get_or_create(
                username="spider_man",
                defaults={
                    "email": "spiderman@marvel.com",
                    "display_name": "Spider-Man",
                },
            )[0],
            UserProfile.objects.get_or_create(
                username="wonder_woman",
                defaults={
                    "email": "wonderwoman@dc.com",
                    "display_name": "Wonder Woman",
                },
            )[0],
            UserProfile.objects.get_or_create(
                username="black_panther",
                defaults={
                    "email": "blackpanther@marvel.com",
                    "display_name": "Black Panther",
                },
            )[0],
        ]

        marvel_team, _ = Team.objects.get_or_create(
            name="Team Marvel",
            defaults={"description": "Marvel super heroes training squad."},
        )
        dc_team, _ = Team.objects.get_or_create(
            name="Team DC",
            defaults={"description": "DC super heroes training squad."},
        )
        marvel_team.members.set([users[0], users[2]])
        dc_team.members.set([users[1]])

        Activity.objects.get_or_create(
            user=users[0],
            activity_type="Web Swinging",
            duration_minutes=30,
            defaults={"calories_burned": 280, "notes": "City patrol."},
        )
        Activity.objects.get_or_create(
            user=users[1],
            activity_type="Combat Training",
            duration_minutes=45,
            defaults={"calories_burned": 360, "notes": "Sparring drills."},
        )
        Activity.objects.get_or_create(
            user=users[2],
            activity_type="Strength",
            duration_minutes=40,
            defaults={"calories_burned": 340, "notes": "Vibranium workout."},
        )

        LeaderboardEntry.objects.get_or_create(
            user=users[0],
            defaults={"points": 140, "rank": 1, "period": "weekly"},
        )
        LeaderboardEntry.objects.get_or_create(
            user=users[1],
            defaults={"points": 120, "rank": 2, "period": "weekly"},
        )
        LeaderboardEntry.objects.get_or_create(
            user=users[2],
            defaults={"points": 110, "rank": 3, "period": "weekly"},
        )

        Workout.objects.get_or_create(
            title="Marvel Mobility",
            defaults={
                "description": "Agility and balance session for hero landings.",
                "difficulty": "beginner",
                "duration_minutes": 25,
                "suggested_for": users[0],
            },
        )
        Workout.objects.get_or_create(
            title="Amazon Warrior",
            defaults={
                "description": "Strength and endurance circuit.",
                "difficulty": "intermediate",
                "duration_minutes": 35,
                "suggested_for": users[1],
            },
        )

        self.stdout.write(self.style.SUCCESS("Octofit Tracker data populated."))
