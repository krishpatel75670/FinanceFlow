import "./TransactionItem.css";

function TransactionItem({ transaction, onEdit, onDelete }) {
    // Format transaction date for nice display
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const dateObj = new Date(dateStr);
        return isNaN(dateObj.getTime()) ? dateStr : dateObj.toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    };

    const isIncome = transaction.type.toLowerCase() === "income";
    const hasActions = !!(onEdit || onDelete);

    return (
        <div className={`transaction-item ${isIncome ? 'income-border' : 'expense-border'}`}>
            <div className="transaction-info">
                <div className="transaction-header">
                    <h3>{transaction.title}</h3>
                    <span className={`badge badge-${transaction.type.toLowerCase()}`}>
                        {transaction.type}
                    </span>
                </div>
                
                <div className="transaction-meta">
                    <span className="meta-category">🏷️ {transaction.category}</span>
                    <span className="meta-date">📅 {formatDate(transaction.date)}</span>
                </div>

                {transaction.description && (
                    <p className="transaction-desc">{transaction.description}</p>
                )}
            </div>

            <div className="transaction-actions">
                <div className="transaction-amount">
                    {isIncome ? '+' : '-'} ₹{transaction.amount.toFixed(2)}
                </div>
                {hasActions && (
                    <div className="action-buttons">
                        {onEdit && (
                            <button 
                                className="btn-action btn-edit" 
                                onClick={() => onEdit(transaction)}
                                title="Edit transaction"
                            >
                                Edit
                            </button>
                        )}
                        {onDelete && (
                            <button 
                                className="btn-action btn-delete" 
                                onClick={() => onDelete(transaction.id)}
                                title="Delete transaction"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TransactionItem;
