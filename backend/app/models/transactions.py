from sqlalchemy import (
    Column,
    Integer,
    String,
    Numeric,
    Date,
    DateTime,
    ForeignKey,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.database import Base


class Transaction(Base):
    __tablename__="transactions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    amount = Column(Numeric(10,2), nullable=False)
    type = Column(String(10), nullable=False)   #income or expense
    category = Column(String(50), nullable=False)
    description = Column(String(255), nullable=False)
    date = Column(DateTime(timezone=True), server_default=func.now())
    user_id = Column(Integer, ForeignKey("users.id"),nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    owner = relationship(
        "User",
        back_populates="transactions",
    ) 
    