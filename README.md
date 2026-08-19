# FinanceFlow

FinanceFlow is a full-stack smart expense tracker that helps users manage income and expenses through a secure web application.

## 🚀 Features

### Authentication
- User registration
- User login and logout
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Current-user endpoint

### Transactions
- Add transactions
- View all transactions
- View a single transaction
- Update transactions
- Delete transactions
- Transaction categories
- Income and expense types
- Date and time support

### Frontend
- React
- Vite
- React Router
- Axios
- Protected routes
- Transaction management UI
- Dashboard UI
- Loading and error handling

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic validation
- Service-layer architecture
- JWT authentication

### Deployment
- Docker
- Docker Compose
- Nginx reverse proxy
- PostgreSQL container
- Production React build

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | FastAPI |
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| Authentication | JWT + bcrypt |
| API Client | Axios |
| Containerization | Docker + Docker Compose |
| Web Server / Reverse Proxy | Nginx |

## 📁 Project Structure

```text
FinanceFlow/
├── Nginx/
│   ├── Dockerfile
│   └── nginx.conf
│
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       ├── api/
│       ├── core/
│       ├── db/
│       ├── models/
│       ├── schemas/
│       ├── services/
│       └── utils/
│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── components/
│       ├── context/
│       ├── css/
│       ├── pages/
│       ├── routes/
│       └── services/
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

## 🔐 Environment Variables

Environment files contain sensitive information and should **not** be committed to GitHub.

### Backend

Create `backend/.env`:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db:5432/financeflow
SECRET_KEY=YOUR_SECRET_KEY
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Root `.env`

Docker Compose uses the root `.env` for PostgreSQL configuration:

```env
POSTGRES_DB=financeflow
POSTGRES_USER=postgres
POSTGRES_PASSWORD=YOUR_PASSWORD
```

Use your own secure values.

## ▶️ Run with Docker

Make sure Docker Desktop is running.

From the project root:

```powershell
docker compose build
docker compose up -d
```

Check the containers:

```powershell
docker compose ps
```

Stop the application:

```powershell
docker compose down
```

## 🌐 Application URLs

When Docker is running:

### Frontend

```text
http://localhost
```

### Backend API Documentation

```text
http://localhost/docs
```

The application uses Nginx as the entry point. Nginx serves the React production build and forwards API requests to FastAPI.

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a user |
| POST | `/auth/login` | Login |
| GET | `/auth/me` | Get current authenticated user |

### Transactions

| Method | Endpoint | Description |
|---|---|---|
| POST | `/transactions/add` | Create transaction |
| GET | `/transactions/all-transactions` | Get transactions |
| GET | `/transactions/transaction-view/{transaction_id}` | Get one transaction |
| PUT | `/transactions/{transaction_id}` | Update transaction |
| DELETE | `/transactions/delete/{transaction_id}` | Delete transaction |

## 🏗️ Architecture

```text
                    Browser
                       │
                       ▼
                 Nginx :80
                  /                        /                   React Frontend   FastAPI Backend
                              │
                              ▼
                         PostgreSQL
```

The backend follows a layered structure:

```text
API Routes
    ↓
Services
    ↓
SQLAlchemy / Database
    ↓
PostgreSQL
```

## 🔒 Security

- Passwords are hashed using bcrypt.
- Authentication uses JWT access tokens.
- Protected API endpoints require authentication.
- Environment files are excluded from Git.
- Production traffic is routed through Nginx.

## 📌 Project Status

Current core development is complete:

- Authentication module ✅
- Transaction model and schemas ✅
- Transaction CRUD API ✅
- React transaction UI ✅
- Protected frontend routes ✅
- Docker setup ✅
- Nginx production setup ✅

Planned or intentionally skipped modules such as budgeting, analytics/charts, and CSV import/export can be added in future versions.

## 🧪 Development

For frontend-only development:

```powershell
cd frontend
npm install
npm run dev
```

For backend development:

```powershell
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

For the full production-style environment:

```powershell
docker compose up -d --build
```

## 👨‍💻 Author

**Krish Patel**

FinanceFlow is a learning and portfolio project demonstrating full-stack development with React, FastAPI, PostgreSQL, authentication, Docker, and Nginx.
