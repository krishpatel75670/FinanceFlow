from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings


db_url = settings.DATABASE_URL.strip() if settings.DATABASE_URL else ""

if not db_url:
    raise RuntimeError("DATABASE_URL environment variable is not set")

if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

engine = create_engine(
    db_url,
    echo=False,
    pool_pre_ping=True,
    pool_recycle=300,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()