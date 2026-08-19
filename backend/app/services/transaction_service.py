from sqlalchemy.orm import Session

from app.models.transactions import Transaction
from app.models.user import User
from app.schemas.transactions import TransactionCreate,TransactionUpdate


class TransactionService:

    @staticmethod
    def add_transaction(
        db: Session,
        transaction_data: TransactionCreate,
        current_user: User,
    ) -> Transaction:

        transaction = Transaction(
            title=transaction_data.title,
            amount=transaction_data.amount,
            type=transaction_data.type,
            category=transaction_data.category,
            description=transaction_data.description,
            date=transaction_data.date,
            user_id=current_user.id,
        )

        db.add(transaction)

        db.commit()

        db.refresh(transaction)

        return transaction

    @staticmethod
    def get_transactions(
        db: Session,
        current_user: User,
    ) -> list[Transaction]:

        transactions = (
            db.query(Transaction)
            .filter(Transaction.user_id == current_user.id)
            .order_by(Transaction.date.desc())
            .all()
        )

        return transactions
    
    @staticmethod
    def get_transaction_by_id(
        db: Session,
        transaction_id: int,
        current_user: User,
    ) -> Transaction | None:

        transaction = (
            db.query(Transaction)
            .filter(
                Transaction.id == transaction_id,
                Transaction.user_id == current_user.id,
            )
            .first()
        )

        return transaction


    @staticmethod
    def update_transaction(
        db: Session,
        transaction_id: int,
        transaction_data: TransactionUpdate,
        current_user: User,
    ) -> Transaction | None:

        transaction = (
            db.query(Transaction)
            .filter(
                Transaction.id == transaction_id,
                Transaction.user_id == current_user.id,
            )
            .first()
        )

        if transaction is None:
            return None

        transaction.title = transaction_data.title
        transaction.amount = transaction_data.amount
        transaction.type = transaction_data.type
        transaction.category = transaction_data.category
        transaction.description = transaction_data.description
        transaction.date = transaction_data.date

        db.commit()
        db.refresh(transaction)

        return transaction



    @staticmethod
    def delete_transaction(
        db: Session,
        transaction_id: int,
        current_user: User,
    ) -> bool:

        transaction = (
            db.query(Transaction)
            .filter(
                Transaction.id == transaction_id,
                Transaction.user_id == current_user.id,
            )
            .first()
        )

        if transaction is None:
            return False

        db.delete(transaction)

        db.commit()

        return True