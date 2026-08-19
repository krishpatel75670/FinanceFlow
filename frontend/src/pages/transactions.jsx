import { useEffect, useState } from "react";
import { addTransaction, getTransactions, updateTransaction, deleteTransaction } from "../services/transactionservices";
import { getCurrentUser } from "../services/authservices";
import Navbar from "../components/Navbar/Navbar";
import "../css/transactions.css";

function Transactions() {
    // Form inputs state
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    // UI state
    const [transactions, setTransactions] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch user's transactions
    async function fetchTransactions() {
        setError("");
        try {
            setLoading(true);
            const data = await getTransactions();
            setTransactions(data);
        } catch (err) {
            console.error("Failed to fetch transactions:", err);
            setError("Failed to load transactions.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    // Reset all form inputs
    const clearForm = () => {
        setTitle("");
        setAmount("");
        setType("");
        setCategory("");
        setDescription("");
        setDate("");
        setEditingId(null);
    };

    // Add or Update form submission
    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!title || !amount || !type || !category || !date) {
            setError("Please fill in all required fields.");
            return;
        }

        try {
            setLoading(true);
            const user = await getCurrentUser();

            const transactionData = {
                title: title,
                amount: Number(amount),
                type: type,
                category: category,
                description: description || "",
                date: date,
                user_id: user.id,
            };

            if (editingId !== null) {
                // Update mode (PUT)
                await updateTransaction(editingId, transactionData);
                setSuccess("Transaction updated successfully.");
                clearForm();
                await fetchTransactions();
            } else {
                // Add mode (POST)
                await addTransaction(transactionData);
                setSuccess("Transaction added successfully.");
                clearForm();
                await fetchTransactions();
            }
        } catch (err) {
            console.error("Failed to save transaction:", err);
            setError(editingId !== null ? "Failed to update transaction." : "Failed to add transaction.");
        } finally {
            setLoading(false);
        }
    }

    // Put selected transaction into edit mode
    function handleStartEdit(transaction) {
        setError("");
        setSuccess("");
        setEditingId(transaction.id);
        setTitle(transaction.title);
        setAmount(transaction.amount.toString());
        setType(transaction.type);
        setCategory(transaction.category);
        setDescription(transaction.description || "");
        
        // Format date string YYYY-MM-DDTHH:MM for datetime-local input
        if (transaction.date) {
            setDate(transaction.date.substring(0, 16));
        } else {
            setDate("");
        }
    }

    // Cancel edit mode
    function handleCancelEdit() {
        clearForm();
        setError("");
        setSuccess("");
    }

    // Delete transaction
    async function handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this transaction?")) {
            return;
        }

        setError("");
        setSuccess("");
        setDeletingId(id);
        setLoading(true);

        try {
            await deleteTransaction(id);
            setSuccess("Transaction deleted successfully.");
            if (editingId === id) {
                clearForm();
            }
            await fetchTransactions();
        } catch (err) {
            console.error("Failed to delete transaction:", err);
            setError("Failed to delete transaction.");
        } finally {
            setLoading(false);
            setDeletingId(null);
        }
    }

    // Format transaction date for nice screen display
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const dateObj = new Date(dateStr);
        return isNaN(dateObj.getTime()) ? dateStr : dateObj.toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    };

    return (
        <div className="page-wrapper">
            <Navbar activePage="transactions" />

            <main className="main-content transactions-container">
                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="success-message">
                        {success}
                    </p>
                )}

                <div className="grid-layout">
                    {/* Form Section */}
                    <section className="form-card animate-fade-in">
                        <h2>{editingId !== null ? "Edit Transaction" : "Add Transaction"}</h2>

                        <form onSubmit={handleSubmit} className="transaction-form">
                            <div className="form-group">
                                <label htmlFor="title">Title <span className="required">*</span></label>
                                <input
                                    type="text"
                                    id="title"
                                    placeholder="e.g. Weekly Groceries"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="amount">Amount (₹) <span className="required">*</span></label>
                                <input
                                    type="number"
                                    id="amount"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="type">Type <span className="required">*</span></label>
                                <select
                                    id="type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                    disabled={loading}
                                >
                                    <option value="">Select type</option>
                                    <option value="Income">Income</option>
                                    <option value="Expense">Expense</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category">Category <span className="required">*</span></label>
                                <input
                                    type="text"
                                    id="category"
                                    placeholder="e.g. Food, Travel, Rent"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    placeholder="Optional details..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="3"
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="date">Date & Time <span className="required">*</span></label>
                                <input
                                    type="datetime-local"
                                    id="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-actions">
                                {editingId !== null ? (
                                    <>
                                        <button 
                                            type="submit" 
                                            className="update-button btn btn-primary"
                                            disabled={loading}
                                        >
                                            {loading ? "Updating..." : "Update Transaction"}
                                        </button>
                                        <button 
                                            type="button" 
                                            className="cancel-button btn btn-secondary" 
                                            onClick={handleCancelEdit}
                                            disabled={loading}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button 
                                        type="submit" 
                                        className="update-button btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? "Adding..." : "Add Transaction"}
                                    </button>
                                )}
                            </div>
                        </form>
                    </section>

                    {/* List Section */}
                    <section className="list-card animate-fade-in">
                        <h2>Your Transactions</h2>

                        {loading && transactions.length === 0 && (
                            <p className="loading-message">Loading transactions...</p>
                        )}

                        {!loading && transactions.length === 0 ? (
                            <div className="empty-state">No transactions found. Start by adding one!</div>
                        ) : (
                            <div className="transaction-list">
                                {transactions.map((transaction) => {
                                    const isIncome = transaction.type.toLowerCase() === "income";
                                    return (
                                        <div 
                                            key={transaction.id} 
                                            className={`transaction-card ${isIncome ? 'income-border' : 'expense-border'}`}
                                        >
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
                                                <div className="action-buttons">
                                                    <button 
                                                        className="edit-button btn-action btn-edit" 
                                                        onClick={() => handleStartEdit(transaction)}
                                                        disabled={loading}
                                                        title="Edit transaction"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        className="delete-button btn-action btn-delete" 
                                                        onClick={() => handleDelete(transaction.id)}
                                                        disabled={loading}
                                                        title="Delete transaction"
                                                    >
                                                        {deletingId === transaction.id ? "Deleting..." : "Delete"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Transactions;