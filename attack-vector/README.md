# Attack Vector CTF Platform

A comprehensive Capture The Flag (CTF) platform for hosting cybersecurity competitions and challenges.

## Features

- User authentication and registration
- Admin portal for challenge management
- Challenge categories (Web, Crypto, Forensics, OSINT, etc.)
- OSINT storylines with sequential challenges
- Real-time scoreboard and ranking system
- Secure flag submission with prevention of resubmission
- Docker-based deployment for easy setup

## Tech Stack

- **Frontend**: React with TailwindCSS
- **Backend**: FastAPI (Python) with PostgreSQL
- **Database**: PostgreSQL
- **Infrastructure**: Docker & Docker Compose
- **Reverse Proxy**: NGINX

## Prerequisites

- Docker Desktop
- Git (optional)

## Deployment

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd attack-vector
   ```

2. Start the platform:
   ```bash
   docker-compose up -d
   ```

3. Access the platform:
   - Frontend: http://localhost
   - Admin Portal: http://localhost/admin
   - API Documentation: http://localhost:8000/docs

## Default Admin Credentials

- Email: sagnik.saha.raptor@gmail.com
- Password: Hotmeha21@21@##

## Project Structure

```
attack-vector/
├── docker-compose.yml
├── README.md
├── frontend/          # React frontend application
├── backend/           # FastAPI backend application
├── database/          # Database initialization scripts
└── nginx/             # NGINX reverse proxy configuration
```

## Development

### Backend Development

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the development server:
   ```bash
   uvicorn app:app --reload
   ```

### Frontend Development

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

## Security Features

- bcrypt password hashing
- JWT token-based authentication
- Input validation and sanitization
- Protection against SQL injection, XSS, and CSRF
- Rate limiting on authentication endpoints
- Secure HTTP-only cookies

## Customization

- Add new challenge categories through the admin portal
- Create OSINT storylines with sequential challenges
- Customize the platform theme and styling
- Modify scoring rules and point values

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.