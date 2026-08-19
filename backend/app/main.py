from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from app.db.database import Base
from app.db.session import engine
from app.db import base
from app.api.auth import router as auth_router
from app.api.transaction import router as transaction_router


Base.metadata.create_all(bind=engine)

app = FastAPI()

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
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(transaction_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to FinanceFlow"}