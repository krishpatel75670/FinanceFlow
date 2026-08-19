from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings



import os
import tempfile
import socket
from urllib.parse import urlparse
from pathlib import Path

# Normalise postgres:// -> postgresql:// for SQLAlchemy compatibility (common with cloud DBs like Supabase/Neon/Render)
db_url = settings.DATABASE_URL.strip() if settings.DATABASE_URL else ""
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)


def is_db_host_unreachable(url: str) -> bool:
    if not url:
        return True
    try:
        parsed = urlparse(url)
        host = parsed.hostname
        if not host:
            return True
        # On Vercel, localhost/db cannot be reached
        if host in ("db", "localhost", "127.0.0.1") and os.environ.get("VERCEL"):
            return True
        # If 'db' hostname is used, check if it resolves (only exists in Docker)
        if host == "db":
            try:
                socket.gethostbyname("db")
            except Exception:
                return True
        return False
    except Exception:
        return True


if is_db_host_unreachable(db_url):
    temp_db = Path(tempfile.gettempdir()) / "financeflow.db"
    db_url = f"sqlite:///{temp_db.as_posix()}"

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



