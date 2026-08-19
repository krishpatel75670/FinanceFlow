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
        # SQLite URLs (sqlite:///...) are local files
        if parsed.scheme.startswith("sqlite"):
            return False
        host = parsed.hostname
        if not host:
            return True
        # On cloud providers (Render, Vercel), internal 'db' or 'localhost' from Docker won't work
        is_cloud_env = bool(
            os.environ.get("RENDER")
            or os.environ.get("RENDER_INSTANCE_ID")
            or os.environ.get("VERCEL")
        )
        if is_cloud_env and host in ("db", "localhost", "127.0.0.1"):
            return True
        # If 'db' hostname is used, check if it resolves (only exists in Docker Compose network)
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

engine_kwargs = {
    "echo": False,
    "pool_pre_ping": True,
    "connect_args": connect_args,
}

# Add pool_recycle for non-SQLite connections to prevent stale connections on cloud DBs
if not db_url.startswith("sqlite"):
    engine_kwargs["pool_recycle"] = 300

engine = create_engine(db_url, **engine_kwargs)

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



