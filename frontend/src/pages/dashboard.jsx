import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTransactions } from "../services/transactionservices";
import { getCurrentUser } from "../services/authservices";
import Navbar from "../components/Navbar/Navbar";
import SummaryCard from "../components/SummaryCard/SummaryCard";
import TransactionItem from "../components/TransactionItem/TransactionItem";
import "../css/dashboard.css";

function Dashboard() {
    // Data states
    const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState([]);
    
    // UI states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                setLoading(true);
                // Fetch user info and transactions in parallel
                const [userData, transactionsData] = await Promise.all([
                    getCurrentUser(),
                    getTransactions()
                ]);
                
                setUser(userData);
                setTransactions(transactionsData);
                setError("");
            } catch (err) {
                console.error("Failed to load dashboard data:", err);
                setError("Failed to load dashboard data. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, []);

    // Calculations
    const totalIncome = transactions
        .filter(t => t.type.toLowerCase() === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type.toLowerCase() === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    // Get 5 most recent transactions (already sorted by date desc on the backend)
    const recentTransactions = [...transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    return (
        <div className="page-wrapper">
            <Navbar activePage="dashboard" />

            <main className="main-content">
                {/* Welcoming Banner */}
                <header className="welcome-banner animate-fade-in">
                    <div className="welcome-text">
                        <h1>Welcome back, {user?.name || "User"}! 👋</h1>
                        <p>Here is your financial overview for today.</p>
                    </div>
                    <div className="dashboard-nav-actions">
                        <Link to="/transactions" className="btn-inline btn-inline-secondary">
                            View All Transactions
                        </Link>
                        <Link to="/transactions" className="btn-inline btn-inline-primary">
                            + Add Transaction
                        </Link>
                    </div>
                </header>

                {error && <div className="alert alert-error animate-fade-in">{error}</div>}

                {loading ? (
                    <div className="loading-state">Loading financial overview...</div>
                ) : (
                    <div className="animate-fade-in">
                        {/* Summary Cards */}
                        <section className="dashboard-stats">
                            <SummaryCard label="Total Income" value={totalIncome} type="income" />
                            <SummaryCard label="Total Expenses" value={totalExpenses} type="expense" />
                            <SummaryCard label="Net Balance" value={balance} type="balance" />
                        </section>

                        {/* Recent Transactions Section */}
                        <section className="dashboard-card">
                            <h2>Recent Transactions</h2>

                            {recentTransactions.length === 0 ? (
                                <div className="empty-state">
                                    No transactions yet. <Link to="/transactions" style={{color: 'var(--accent-indigo)', textDecoration: 'underline'}}>Add your first transaction</Link> to get started!
                                </div>
                            ) : (
                                <div className="transactions-list">
                                    {recentTransactions.map((transaction) => (
                                        <TransactionItem 
                                            key={transaction.id} 
                                            transaction={transaction} 
                                        />
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Dashboard;