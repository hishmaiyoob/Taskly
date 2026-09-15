# Taskly

Taskly is a full-stack Trello-like task management application built as part of a software engineer intern technical assegnment.

The application provides a task board with three workflow statuses - To Do, Doing, and Done. Supports drag and drop task management, authentication, role-based authorization, task assignment, and administrator task management.

## Features

### User Authentication

- User registration and login
- Secure password hashing using bcrypt
- JWT based authentication
- Protected backend API routes
- Role based authorization

### Normal Users

- Register and log in
- Create tasks
- View their tasks
- Assign unassigned tasks to themselves
- Update their tasks
- Delete their tasks
- Move tasks between To Do, Doing, and Done
- View task status and assignment information


### Admministrators

- Admin accounts are created through database seeding
- View all registered users
- View all tasks
- Search and filter tasks
- Assign tasks to users
- Reassign tasks between users
- Unassign tasks
- View task statistics and system overview

### Task Board

- Three status columns:
 - To Do
 - Doing
 - Done
- Drag and drop task cards
- Task status changes persist in MongoDB
- Changes remain after refresh

## Tecknology Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- dnd-kit
- Lucide React

### Backend

- Node.js
- Express.js
- JWT
- bcryptjs
- Mongoose

### Database

- MongoDB
- MongoDB Atlas for production deployement

## Project Structure

```text
Taskly/
├── Frontend/
│   ├── src/
│   └── ...
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seed/
│   │   └── server.js
│   └── ...
│
└── README.md
```

## Getting Started

### Prerequisites

Before running taskly locally, make sure you have the following installed:

- Node.js 18 or later
- npm
- MongoDB or MongoDB Atlas account
- Git

### Clone the Repository

```bash
git clone https://github.com/hishmaiyoob/Taskly.git
cd Taskly
```

### Backend Setup

Open a terminal and navigate to the backend:

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` derectory and add the required environment variables.

Then start the backend development server:

```bash
npm run dev
```

The backend will rin on:

```text
http://localhost:5000
```

### Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd Frontend
npm install
```

Craete a `.env` file inside `Frontend` directory:

```env
VITE_API_URL=http://localhost:5000
```

Then start the frontend development server:

```bash
npm run dev
```

Vite will provide the local frontend URL in the terminal.

## Environment Variables

Taskly uses environment variables to store configiration values and sensitive credentials.

### Backend Environment Variables

Create a `.env` file inside the `Backend` derectory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_NAME=Taskly Admin
ADMIN_EMAIL=admin@taskly.com
ADMIN_PASSWORD=your_secure_admin_password
```

#### Backend variables

| Variable | Description |
|---|---|
| `PORT` | Port used by the Express backend |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key used to sign JWT tokens |
| `ADMIN_NAME` | Name used when creating the seeded administrator |
| `ADMIN_EMAIL` | Email address of the seeded administrator |
| `ADMIN_PASSWORD` | Password used for the seeded administrator |

### Frontend environment variables

Create a `.env` file inside the `Frontend` directory:

```env
VITE_API_URL=http://localhost:5000
```

#### Frontend Variables

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API |

### Security

Environment files containing secrests must not be committed to Git.

The following files are included in `.gitignore`:

```text
.env
.env.*
```

For production deployement, environment variables should be configured through the hosting platform rather that stored directly in the source code.

## Admin Account Setup

Administrator accounts are not created through public registration process.

The administrator account is created using the database seed script and administrator credentials defined in the backend environment variables.

From the `Backend` directory, run:

```bash
npm run seed:admin
```

The seed script:

- Check whether an administrator already exists.
- Create the administrator if one does not exist.
- Hashes the administrator password using bcrypt.
- Stores the administrator with the `admin` role.
- Prevents duplicate administrator creation.

The administrator can then log in through normal login page using the seeded credentials.

> For security, administrator credentials should never be commited to the repository. Use environment variables or the final submission document as required.


## User Roles & Permissions

Taskly implements two roles: **Normal User** and **Administrator**.

### Normal User

Normal user can:

- Register an account.
- Log in securely.
- Create tasks.
- View their own tasks and tasks assigned to them.
- Assign an unassigned task to themselves.
- Update their own tasks.
- Delete their own tasks.
- Move tasks between To Do, Doing, and Done.
- View task status and assignment information.

Normal user cannot:

- Assign tasks to other users.
- Access administrator-only APIs.
- View the complete list of system users.
- View tasks belonging exclusively to other users.

### Administrator

Administrators are created through the database seed script.

Administrator can:

- Log in using seeded administrator credentials.
- View all registered users.
- View all tasks.
- Search and filter tasks.
- Assign tasks to normal users.
- Reassign tasks between normal users.
- Unassign tasks.
- View system-wide task statistics.
- Access administrator-only dashboard features.

Role-based authorization is enforced on the backend using authentication and authorization middleware.

## API Endpoints

All API endpoints are prefixed with:

```text
/api
```

Protected endpoints require a valid JWT access token in the request header:

```text
Authorization: Bearer <token>
```

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a normal user |
| POST | `/api/auth/login` | Public | Authenticate a user and return a JWT |

### Users

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/users/me` | Authenticated | Get the currently logged-in user's information |

### Tasks

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/tasks` | Authenticated | Create a task |
| GET | `/api/tasks/my` | Authenticated | Get tasks available to the current user |
| GET | `/api/tasks/:id` | Authenticated | Get a specific task |
| PUT | `/api/tasks/:id` | Authenticated | Update a task |
| PUT | `/api/tasks/:id/assign` | Authenticated | Assign a task to the current user according to role permissions |
| DELETE | `/api/tasks/:id` | Authenticated | Delete a task |

### User Dashboard

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/dashboard/user` | Authenticated | Get task statistics for the current user |

### Administrator

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/admin/dashboard` | Admin | Get system-wide dashboard statistics |
| GET | `/api/admin/users` | Admin | Get all normal users |
| GET | `/api/admin/tasks` | Admin | Get all tasks |
| GET | `/api/admin/tasks?status=todo` | Admin | Filter tasks by status |
| GET | `/api/admin/tasks?assignedUser=USER_ID` | Admin | Filter tasks by assigned user |
| PUT | `/api/admin/tasks/:id/assign` | Admin | Assign or reassign a task |
| PUT | `/api/admin/tasks/:id/unassign` | Admin | Remove the current task assignment |

### Authorization

Backend authorization is enforced using JWT authentication middleware and administrator-only middleware.

Unauthorized requests return appropriate HTTP status codes such as:

- `401 Unauthorized` for missing or invalid authentication.
- `403 Forbidden` for authenticated users without sufficient permissions.
- `404 Not Found` when a requested resource does not exist.
- `400 Bad Request` for invalid request data.

## Task Board and Drag-and-Drop

Taskly provides a Trello-like task board with three fixed status columns:

- **To Do**
- **Doing**
- **Done**

Users can move task cards between the status columns using drag-and-drop functionality.

### Status Workflow

```text
To Do  →  Doing  →  Done
```

Tasks can also be moved back to a previous status when necessary.

When a task is moved to another column:

1. The frontend detects the drag-and-drop action.
2. The task status is updated.
3. The frontend sends the new status to the backend API.
4. The backend validates the status.
5. The updated status is saved to MongoDB.
6. The updated task remains in the new column after refreshing the page.

This ensures that task status changes are persisted in the database rather than only being stored in the frontend.

### Supported Status Values

| Status | Description |
|---|---|
| `todo` | Task has not been started |
| `doing` | Task is currently in progress |
| `done` | Task has been completed |

## Security

Taskly implements several security measures to protect user accounts, authentication tokens, and application data.

### Authentication

- User authentication is implemented using JSON Web Tokens (JWT).
- Protected API routes require a valid JWT access token.
- Authentication middleware verifies the token before allowing access to protected resources.
- Expired or invalid tokens are rejected by the backend.

### Password Security

- User passwords are never stored in plain text.
- Passwords are hashed using `bcryptjs` before being stored in MongoDB.
- The original password is not returned in API responses.

### Role-Based Access Control

Taskly uses backend-enforced role-based authorization.

- Normal users can access user-level functionality.
- Administrators can access administrator-only endpoints.
- Administrator routes use dedicated authorization middleware.
- Users cannot gain administrator permissions through the public registration process.

### Environment Variables

Sensitive configuration values such as:

- MongoDB connection strings
- JWT secrets
- Administrator credentials

are stored in environment variables rather than hard-coded in the application source code.

Environment files are excluded from Git using `.gitignore`.

### API Protection

Protected endpoints verify authentication and authorization on the backend rather than relying only on frontend restrictions.

This prevents users from bypassing frontend controls by directly sending requests to the API.

## Deployment

Taskly is designed to be deployed as two separate applications:

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB Atlas

### Production Architecture

```text
User Browser
     │
     ▼
Frontend Application
     │
     │ REST API requests
     ▼
Backend Application
     │
     ▼
MongoDB Atlas