from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings



import os

# Normalise postgres:// -> postgresql:// for SQLAlchemy compatibility (common with cloud DBs like Supabase/Neon/Render)
db_url = settings.DATABASE_URL.strip() if settings.DATABASE_URL else ""
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

if not db_url:
    # If no external DATABASE_URL is supplied, use /tmp on Vercel (read-only filesystem except /tmp)
    if os.environ.get("VERCEL"):
        db_url = "sqlite:////tmp/financeflow.db"
    else:
        db_url = "sqlite:///./financeflow.db"

connect_args = {"check_same_thread": False} if db_url.startswith("sqlite") else {}

engine = create_engine(
    db_url,
    echo=False,
    pool_pre_ping=True,
    connect_args=connect_args
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



