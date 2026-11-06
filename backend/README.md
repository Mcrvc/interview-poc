# AI Virtual Assistant — Authentication Module

A small authentication module developed as part of an AI Virtual Assistant course project. It provides account registration, login, session validation, and logout through a FastAPI backend backed by PostgreSQL.

The existing frontend is a proof of concept (PoC). The authentication endpoints connect to the backend, while other application workflows may still use local demo data.

## Table of Contents

- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Database Setup](#database-setup)
- [Backend Configuration](#backend-configuration)
- [Database Migrations](#database-migrations)
- [Running the Backend](#running-the-backend)
- [Running the Frontend](#running-the-frontend)
- [Testing the API](#testing-the-api)
- [Authentication Workflow](#authentication-workflow)
- [Troubleshooting](#troubleshooting)
- [Security Notes](#security-notes)

## Technology Stack

| Component | Technology |
|---|---|
| Backend framework | FastAPI |
| Programming language | Python |
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| Database migrations | Alembic |
| Password hashing | Argon2id |
| Authentication | Session-based authentication using an HTTP-only cookie |
| Frontend | HTML, CSS, JavaScript |

## Project Structure

```text
poc/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth.py
│   │   ├── core/
│   │   │   ├── security.py
│   │   │   └── session.py
│   │   ├── db/
│   │   │   └── session.py
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   └── session.py
│   │   ├── schemas/
│   │   │   └── auth.py
│   │   ├── alembic/
│   │   ├── main.py
│   │   └── ...
│   └── ...
├── frontend/
│   ├── sign-in.html
│   ├── sign-up.html
│   ├── dashboard.html
│   ├── js/
│   │   ├── api.js
│   │   └── app.js
│   └── ...
├── .gitignore
└── README.md
```

## Requirements

The following instructions target Linux distributions such as Arch Linux, Ubuntu, and Debian.

Install the required tools using the package manager available on your system.

### Arch Linux

```bash
sudo pacman -S python python-pip postgresql nodejs
```

### Ubuntu / Debian

```bash
sudo apt update
sudo apt install python3 python3-venv python3-pip postgresql postgresql-client nodejs npm
```

You will also need Git if you are cloning the project.

## Database Setup

The application uses PostgreSQL to store user accounts and authentication sessions.

### 1. Start PostgreSQL

#### Arch Linux

Initialize the PostgreSQL data directory if this is a fresh installation:

```bash
sudo -iu postgres initdb --locale=C.UTF-8 --encoding=UTF8 -D /var/lib/postgres/data
```

Enable and start PostgreSQL:

```bash
sudo systemctl enable --now postgresql
```

If PostgreSQL has already been initialized, do not run `initdb` again.

#### Ubuntu / Debian

```bash
sudo systemctl enable --now postgresql
```

Check that PostgreSQL is running:

```bash
systemctl status postgresql
```

### 2. Create the database and database user

Open the PostgreSQL shell as the PostgreSQL administrator:

```bash
sudo -iu postgres psql
```

Create a dedicated database user and database:

```sql
CREATE USER assistant_user WITH PASSWORD 'replace_with_a_strong_password';

CREATE DATABASE assistant_db OWNER assistant_user;
```

Exit the PostgreSQL shell:

```sql
\q
```

The application database is now:

- **Database name:** `assistant_db`
- **Database user:** `assistant_user`

Replace the example password with a strong local development password.

### 3. Verify the database connection

Run:

```bash
psql -h 127.0.0.1 -U assistant_user -d assistant_db
```

Enter the password when prompted.

If the connection succeeds, exit:

```sql
\q
```

## Backend Configuration

Navigate to the backend directory:

```bash
cd backend
```

### 1. Create a Python virtual environment

```bash
python -m venv .venv
```

Activate it:

```bash
source .venv/bin/activate
```

### 2. Install Python dependencies

Install the project's dependencies using its requirements file, if present:

```bash
pip install -r requirements.txt
```

If the project uses a different dependency file or package manager, follow the corresponding project configuration.

### 3. Configure the database connection

The backend must be configured to connect to the PostgreSQL database created above.

A typical SQLAlchemy PostgreSQL connection URL has the following format:

```text
postgresql+psycopg://assistant_user:YOUR_PASSWORD@127.0.0.1:5432/assistant_db
```

Use the database configuration expected by the project, such as its `.env` file or application settings.

**Important:** The actual environment variable name must match the one read by `backend/app/db/session.py` and the Alembic configuration. Do not commit database passwords or other secrets to Git.

## Database Migrations

The project uses Alembic to create and update database tables.

Ensure that the virtual environment is activated and that you are in the backend directory:

```bash
cd backend
source .venv/bin/activate
```

Apply all migrations:

```bash
alembic upgrade head
```

This should create the database tables required by the application, including:

- `users`
- `sessions`
- `alembic_version`

To inspect the current migration revision:

```bash
alembic current
```

To inspect the migration history:

```bash
alembic history
```

To verify the tables in PostgreSQL:

```bash
psql -h 127.0.0.1 -U assistant_user -d assistant_db
```

Then run:

```sql
\dt
```

Exit with:

```sql
\q
```

## Running the Backend

From the `backend/` directory, activate the virtual environment:

```bash
source .venv/bin/activate
```

Start the FastAPI development server:

```bash
uvicorn app.main:app --reload
```

The backend should be available at:

```text
http://127.0.0.1:8000
```

The root endpoint can be used to verify that the server is running:

```text
http://127.0.0.1:8000/
```

Expected response:

```json
{
  "message": "Authentication API is running"
}
```

The health endpoint is:

```text
http://127.0.0.1:8000/health
```

Expected response:

```json
{
  "status": "healthy"
}
```

Keep this terminal open while testing the application.

## Running the Frontend

Open a **second terminal**.

Navigate to the project root directory:

```bash
cd poc
```

Start the local frontend server:

```bash
python -m http.server 5500 --directory frontend
```

The frontend will be available at:

```text
http://127.0.0.1:5500
```

Open the sign-up page:

```text
http://127.0.0.1:5500/sign-up.html
```

Open the sign-in page:

```text
http://127.0.0.1:5500/sign-in.html
```

The frontend API helper sends requests to the backend at:

```text
http://127.0.0.1:8000
```

The frontend should be accessed through the local HTTP server rather than by opening the HTML files directly with a `file://` URL.

## Testing the API

FastAPI automatically provides interactive API documentation through Swagger UI.

### 1. Open the API documentation

Start the backend, then open:

```text
http://127.0.0.1:8000/docs
```

This page allows you to inspect the API endpoints, submit requests, and view responses.

The authentication API currently provides the following endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/auth/signup` | Register a new account |
| `POST` | `/api/auth/login` | Authenticate and create a session |
| `GET` | `/api/auth/me` | Return the currently authenticated user |
| `POST` | `/api/auth/logout` | End the current session |
| `GET` | `/` | Check whether the API is running |
| `GET` | `/health` | Health check |

### 2. Test account registration

In Swagger UI:

1. Find `POST /api/auth/signup`.
2. Expand the endpoint.
3. Click **Try it out**.
4. Enter a new username and password in the request body.
5. Click **Execute**.

Example request:

```json
{
  "username": "test_user",
  "password": "TestPassword123!"
}
```

Expected result:

- HTTP status: `201 Created`
- The response contains the registered user's information.
- The password should not be returned in the response.

Try registering the same username again.

Expected result:

- The API rejects the duplicate account.
- The response contains an appropriate error message.

### 3. Test login

Find `POST /api/auth/login`.

Click **Try it out** and submit the credentials for the account you registered.

Example request:

```json
{
  "username": "test_user",
  "password": "TestPassword123!"
}
```

Expected result:

- HTTP status: `200 OK`
- The response contains user information.
- The server sets a session cookie named `session`.

The session cookie is used to authenticate subsequent requests.

### 4. Test the current-user endpoint

Find `GET /api/auth/me`.

Click **Try it out**, then click **Execute**.

Expected result:

- If the login session is valid, the endpoint returns the authenticated user's information.
- If no valid session is present, the endpoint should reject the request with an authentication error.

**Note:** Swagger UI may not automatically retain or send the session cookie for every configuration. If the endpoint returns an authentication error after a successful login, verify the cookie in the browser's developer tools or test the endpoints using the frontend or `curl`.

### 5. Test logout

Find `POST /api/auth/logout`.

Click **Try it out**, then click **Execute**.

Expected result:

- The server invalidates the current session.
- The session cookie is cleared.
- The response indicates that logout succeeded.

Call `GET /api/auth/me` again.

Expected result:

- The previous session is no longer valid.
- The API rejects the request as unauthenticated.

## Authentication Workflow

The authentication flow works as follows:

1. A user registers with a username and password.
2. The backend hashes the password using Argon2id and stores the resulting hash in PostgreSQL.
3. The user submits their credentials to the login endpoint.
4. The backend verifies the password.
5. The backend creates a session and stores a hash of the session token in the database.
6. The raw session token is sent to the browser in an HTTP-only cookie.
7. Subsequent authenticated requests include the session cookie.
8. The backend validates the session and identifies the authenticated user.
9. When the user logs out, the session is invalidated.

## Troubleshooting

### PostgreSQL is not running

Check its status:

```bash
systemctl status postgresql
```

Start it:

```bash
sudo systemctl start postgresql
```

### Database connection failed

Verify:

- PostgreSQL is running.
- The database exists.
- The database user and password are correct.
- The connection URL points to the correct host, port, and database.

Test the connection manually:

```bash
psql -h 127.0.0.1 -U assistant_user -d assistant_db
```

### Database tables are missing

Apply the migrations:

```bash
cd backend
source .venv/bin/activate
alembic upgrade head
```

### Frontend cannot connect to the backend

Verify that:

- The backend is running at `http://127.0.0.1:8000`.
- The frontend is running at `http://127.0.0.1:5500`.
- The backend CORS configuration allows the frontend origin.
- The frontend API helper uses `credentials: "include"`.

### Browser reports a CORS error

The backend must explicitly allow the frontend origin and credentials.

For local development, the CORS configuration should include:

```python
allow_origins=[
    "http://127.0.0.1:5500",
    "http://localhost:5500",
],
allow_credentials=True,
```

Do not use wildcard origins when credentialed requests are required.

### Login succeeds, but the dashboard does not load correctly

The current frontend includes proof-of-concept workflows that may still rely on local demo state. A successful backend login does not necessarily mean every page is already connected to the backend or protected by the session.

## Security Notes

- Passwords are hashed using Argon2id before being stored.
- Raw session tokens should not be stored in the database.
- Session cookies are configured as HTTP-only.
- The current development configuration uses local HTTP and is not intended for production deployment.
- Do not commit database credentials, session secrets, or other sensitive configuration to Git.
- Use HTTPS and secure cookie settings when deploying outside local development.
- Authentication should be enforced by the backend, not only by frontend page redirects.
- This project is a course proof of concept and should not be treated as production-ready without additional security review.
