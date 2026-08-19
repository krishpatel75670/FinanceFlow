from pydantic import BaseModel, ConfigDict
from datetime import datetime

class TransactionCreate(BaseModel):
    title: str
    amount: float
    type: str
    category: str
    description: str
    date: datetime
    user_id: int

    model_config = ConfigDict(
        extra="forbid"
    )

class TransactionBase(BaseModel):
    id: int
    title: str
    amount: float
    type: str
    category: str
    description: str
    date: datetime
    user_id: int

    model_config = ConfigDict(
        from_attributes=True
    )

class TransactionResponse(TransactionBase):
    id: int
    title: str
    amount: float
    type: str
    category: str
    description: str
    date: datetime
    user_id: int

    model_config = ConfigDict(
        from_attributes=True
    )

class TransactionUpdate(BaseModel):
    title: str
    amount: float
    type: str
    category: str
    description: str
    date: datetime
    user_id: int

    model_config = ConfigDict(
        from_attributes=True
    )

class TransactionDelete(BaseModel):
    id: int
    title: str
    amount: float
    type: str
    category: str
    description: str
    date: datetime
    user_id: int

    model_config = ConfigDict(
        from_attributes=True
    )