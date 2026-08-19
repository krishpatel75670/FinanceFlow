from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import Base
from app.db.session import engine
from app.db import base  # noqa: F401
from app.api.auth import router as auth_router
from app.api.transaction import router as transaction_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Safely create tables at startup without breaking module imports
    try:
        Base.metadata.create_all(bind=engine)
    except Exception as e:
        print(f"Database initialization notice: {e}")
    yield


app = FastAPI(
    title="FinanceFlow API",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost",
        "http://127.0.0.1",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi import Request
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError, OperationalError


@app.exception_handler(OperationalError)
async def db_operational_error_handler(request: Request, exc: OperationalError):
    error_detail = str(exc.orig) if hasattr(exc, "orig") else str(exc)
    print(f"Database OperationalError: {error_detail}")
    return JSONResponse(
        status_code=500,
        content={
            "detail": f"Database connection error: Unable to communicate with the database. Please verify DATABASE_URL in your Vercel Environment Variables. ({error_detail})"
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
    return {"message": "Welcome to FinanceFlow API"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}