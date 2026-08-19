import os
import sys

# Ensure backend root is on sys.path regardless of working directory
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import text
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError, OperationalError

from app.core.config import settings
from app.db.database import Base
from app.db.session import engine, get_db
from app.db import base  # noqa: F401
from app.api.auth import router as auth_router
from app.api.transaction import router as transaction_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Safely create tables at startup without breaking module imports
    try:
        Base.metadata.create_all(bind=engine)
        print(f"Database tables checked/created successfully using engine: {engine.url.scheme}")
    except Exception as e:
        print(f"Database initialization notice: {e}")
    yield


app = FastAPI(
    title="FinanceFlow API",
    lifespan=lifespan
)

# Configure CORS origins
cors_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:80",
    "http://127.0.0.1:80",
    "http://localhost",
    "http://127.0.0.1",
]
if settings.CORS_ORIGINS:
    cors_origins.extend([origin.strip() for origin in settings.CORS_ORIGINS.split(",") if origin.strip()])

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_origin_regex=r".*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(OperationalError)
async def db_operational_error_handler(request: Request, exc: OperationalError):
    error_detail = str(exc.orig) if hasattr(exc, "orig") else str(exc)
    print(f"Database OperationalError: {error_detail}")
    return JSONResponse(
        status_code=500,
        content={
            "detail": f"Database connection error: Unable to communicate with the database. Please verify DATABASE_URL in your cloud environment variables. ({error_detail})"
        },
    )


@app.exception_handler(SQLAlchemyError)
async def db_sqlalchemy_error_handler(request: Request, exc: SQLAlchemyError):
    print(f"Database SQLAlchemyError: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": f"Database error occurred: {str(exc)}"},
    )


app.include_router(auth_router)
app.include_router(transaction_router)


@app.get("/")
def read_root():
    return {
        "message": "Welcome to FinanceFlow API",
        "docs": "/docs",
        "health": "/health",
        "database_backend": engine.url.scheme,
    }


@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        return {
            "status": "healthy",
            "database": "connected",
            "database_type": engine.url.scheme,
        }
    except Exception as e:
        return {
            "status": "degraded",
            "database": "error",
            "database_type": engine.url.scheme,
            "error": str(e),
        }