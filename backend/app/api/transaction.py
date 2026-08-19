from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.transactions import TransactionCreate, TransactionResponse,TransactionUpdate
from app.services.transaction_service import TransactionService

from fastapi import HTTPException

router = APIRouter(
    prefix="/transactions",
    tags=["Transactions"],
)


@router.post(
    "/add",
    response_model=TransactionResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_transaction(
    transaction: TransactionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return TransactionService.add_transaction(
        db=db,
        transaction_data=transaction,
        current_user=current_user,
    )

@router.get(
    "/all-transactions",
    response_model=list[TransactionResponse],
)
def get_transactions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return TransactionService.get_transactions(
        db=db,
        current_user=current_user,
    )





@router.get(
    "/transaction-view/{transaction_id}",
    response_model=TransactionResponse,
)
def get_transaction(
    transaction_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    transaction = TransactionService.get_transaction_by_id(
        db=db,
        transaction_id=transaction_id,
        current_user=current_user,
    )

    if transaction is None:
        raise HTTPException(
            status_code=404,
            detail="Transaction not found",
        )

    return transaction

@router.put(
    "/{transaction_id}",
    response_model=TransactionResponse,
)
def update_transaction(
    transaction_id: int,
    transaction: TransactionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    updated_transaction = TransactionService.update_transaction(
        db=db,
        transaction_id=transaction_id,
        transaction_data=transaction,
        current_user=current_user,
    )

    if updated_transaction is None:
        raise HTTPException(
            status_code=404,
            detail="Transaction not found",
        )

    return updated_transaction




@router.delete(
    "/delete/{transaction_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_transaction(
    transaction_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deleted = TransactionService.delete_transaction(
        db=db,
        transaction_id=transaction_id,
        current_user=current_user,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Transaction not found",
        )