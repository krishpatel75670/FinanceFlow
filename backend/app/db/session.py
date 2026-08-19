from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings



# Normalise postgres:// -> postgresql:// for SQLAlchemy compatibility (common with cloud DBs like Supabase/Neon/Render)
db_url = settings.DATABASE_URL
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

engine = create_engine(
    db_url if db_url else "sqlite:///./financeflow.db",
    echo=False,
    pool_pre_ping=True
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



