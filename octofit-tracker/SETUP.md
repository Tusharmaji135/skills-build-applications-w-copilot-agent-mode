# OctoFit Tracker - Setup Guide

## Overview

OctoFit Tracker is a fitness tracking application that allows users to:
- Track their fitness activities
- Join and manage teams
- View leaderboard rankings
- Get personalized workout suggestions
- Manage user profiles

## Technology Stack

### Backend
- **Framework**: Django 4.1.7
- **API**: Django REST Framework 3.14.0
- **Database**: MongoDB (via Djongo 1.3.6)
- **CORS**: django-cors-headers 4.5.0

### Frontend
- **Framework**: React 19.2.4
- **Routing**: React Router DOM 7.13.0
- **UI**: Bootstrap 5.3.8
- **Testing**: React Testing Library

## Project Structure

```
octofit-tracker/
├── backend/
│   ├── octofit_tracker/
│   │   ├── models.py          # Database models
│   │   ├── serializers.py     # DRF serializers
│   │   ├── views.py           # API viewsets
│   │   ├── urls.py            # URL routing
│   │   ├── settings.py        # Django settings
│   │   └── management/
│   │       └── commands/
│   │           └── populate_db.py  # Database population
│   └── requirements.txt
└── frontend/
    ├── public/
    ├── src/
    │   ├── App.js
    │   ├── components/
    │   │   ├── Activities.js
    │   │   ├── Leaderboard.js
    │   │   ├── Teams.js
    │   │   ├── Users.js
    │   │   └── Workouts.js
    │   └── index.js
    └── package.json
```

## Backend Setup

### Prerequisites
- Python 3.x
- MongoDB

### Installation

1. Create and activate virtual environment:
```bash
python3 -m venv octofit-tracker/backend/venv
source octofit-tracker/backend/venv/bin/activate
```

2. Install dependencies:
```bash
pip install -r octofit-tracker/backend/requirements.txt
```

3. Configure MongoDB:
- Ensure MongoDB is running on localhost:27017
- The application will create the `octofit_db` database

4. Run migrations:
```bash
cd octofit-tracker/backend
python manage.py migrate
```

5. Populate test data:
```bash
python manage.py populate_db
```

6. Start the development server:
```bash
python manage.py runserver 0.0.0.0:8000
```

The API will be available at `http://localhost:8000/api/`

## Frontend Setup

### Prerequisites
- Node.js and npm

### Installation

1. Install dependencies:
```bash
npm install --prefix octofit-tracker/frontend
```

2. Start the development server:
```bash
npm start --prefix octofit-tracker/frontend
```

The application will open at `http://localhost:3000`

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/` - API root with endpoint links
- `GET/POST /api/users/` - User profiles
- `GET/POST /api/teams/` - Teams
- `GET/POST /api/activities/` - Activities
- `GET/POST /api/leaderboard/` - Leaderboard entries
- `GET/POST /api/workouts/` - Workout suggestions

Each endpoint supports standard REST operations (GET, POST, PUT, PATCH, DELETE).

## Data Models

### UserProfile
- username (unique)
- email (unique)
- display_name
- created_at

### Team
- name (unique)
- description
- members (Many-to-Many with UserProfile)
- created_at

### Activity
- user (ForeignKey to UserProfile)
- activity_type
- duration_minutes
- calories_burned
- logged_at
- notes

### LeaderboardEntry
- user (ForeignKey to UserProfile)
- points
- rank
- period (weekly, monthly, etc.)
- updated_at

### Workout
- title
- description
- difficulty (beginner, intermediate, advanced)
- duration_minutes
- suggested_for (ForeignKey to UserProfile)
- created_at

## Development Notes

- The backend uses Djongo to work with MongoDB using Django ORM
- CORS is configured to allow frontend access
- The frontend includes Bootstrap for styling
- React Router handles client-side routing
- All API responses serialize MongoDB ObjectIds to strings

## Testing

### Backend
```bash
cd octofit-tracker/backend
python manage.py test
```

### Frontend
```bash
npm test --prefix octofit-tracker/frontend
```

## Deployment

For GitHub Codespaces deployment:
- The backend automatically configures ALLOWED_HOSTS for Codespaces
- Frontend components use environment-based API URLs
- Ports 3000 (frontend) and 8000 (backend) are forwarded
