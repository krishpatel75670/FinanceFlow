import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/home.css";

function Home() {
    const { token } = useAuth();

    return (
        <div className="home-container">
            {/* Top Navigation */}
            <header className="home-nav">
                <Link to="/" className="home-logo">
                    <div className="home-logo-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="1" x2="12" y2="23"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                    </div>
                    <span>Finance<span className="home-logo-accent">Flow</span></span>
                </Link>

                <div className="home-nav-links">
                    <a href="#features" className="home-nav-link">Features</a>
                    <a href="#preview" className="home-nav-link">Overview</a>
                    <a href="#how-it-works" className="home-nav-link">How It Works</a>
                </div>

                <div className="home-nav-actions">
                    {token ? (
                        <Link to="/dashboard" className="btn-nav-cta">
                            Go to Dashboard
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </Link>
                    ) : (
                        <>
                            <Link to="/login" className="btn-nav-login">Sign In</Link>
                            <Link to="/register" className="btn-nav-cta">
                                Get Started Free
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </Link>
                        </>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-badge">
                    <span className="hero-badge-dot"></span>
                    <span>Smart Personal Finance & Budget Tracker</span>
                </div>

                <h1 className="hero-title">
                    Take Full Control of Your <br />
                    <span className="hero-title-gradient">Financial Future</span>
                </h1>

                <p className="hero-subtitle">
                    Effortlessly track income, analyze spending habits, and build long-term savings with real-time analytics and bank-grade data security.
                </p>

                <div className="hero-cta-group">
                    <Link to={token ? "/dashboard" : "/register"} className="btn-hero-primary">
                        {token ? "Open Dashboard" : "Start Tracking Free"}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </Link>
                    {!token && (
                        <Link to="/login" className="btn-hero-secondary">
                            Live Demo / Sign In
                        </Link>
                    )}
                </div>

                <div className="hero-stats">
                    <div className="hero-stat-item">
                        <div className="hero-stat-value">100%</div>
                        <div className="hero-stat-label">Free & Open Source</div>
                    </div>
                    <div className="hero-stat-item">
                        <div className="hero-stat-value">&lt; 100ms</div>
                        <div className="hero-stat-label">FastAPI Response</div>
                    </div>
                    <div className="hero-stat-item">
                        <div className="hero-stat-value">256-bit</div>
                        <div className="hero-stat-label">Encrypted Security</div>
                    </div>
                </div>
            </section>

            {/* Interactive Preview Mockup Section */}
            <section className="preview-section" id="preview">
                <div className="preview-glow"></div>
                <div className="preview-card">
                    <div className="preview-header">
                        <div className="preview-title">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="3" y1="9" x2="21" y2="9"></line>
                                <line x1="9" y1="21" x2="9" y2="9"></line>
                            </svg>
                            <span>Live Financial Overview</span>
                        </div>
                        <div className="preview-window-dots">
                            <span className="dot dot-red"></span>
                            <span className="dot dot-yellow"></span>
                            <span className="dot dot-green"></span>
                        </div>
                    </div>

                    <div className="preview-grid">
                        <div className="preview-stat-box">
                            <div className="preview-stat-label">Total Balance</div>
                            <div className="preview-stat-amount amount-balance">$8,450.00</div>
                        </div>
                        <div className="preview-stat-box">
                            <div className="preview-stat-label">Total Income</div>
                            <div className="preview-stat-amount amount-income">+$12,300.00</div>
                        </div>
                        <div className="preview-stat-box">
                            <div className="preview-stat-label">Total Expenses</div>
                            <div className="preview-stat-amount amount-expense">-$3,850.00</div>
                        </div>
                    </div>

                    <div className="preview-table">
                        <div className="preview-row">
                            <div className="preview-item-info">
                                <div className="preview-item-icon icon-income">💰</div>
                                <div>
                                    <div className="preview-item-name">Monthly Salary</div>
                                    <div className="preview-item-category">Income • Work & Career</div>
                                </div>
                            </div>
                            <div className="preview-stat-amount amount-income" style={{ fontSize: "1.05rem" }}>+$5,000.00</div>
                        </div>

                        <div className="preview-row">
                            <div className="preview-item-info">
                                <div className="preview-item-icon icon-expense">🛒</div>
                                <div>
                                    <div className="preview-item-name">Supermarket Groceries</div>
                                    <div className="preview-item-category">Expense • Essentials</div>
                                </div>
                            </div>
                            <div className="preview-stat-amount amount-expense" style={{ fontSize: "1.05rem" }}>-$142.50</div>
                        </div>

                        <div className="preview-row">
                            <div className="preview-item-info">
                                <div className="preview-item-icon icon-income">📈</div>
                                <div>
                                    <div className="preview-item-name">Stock Dividend</div>
                                    <div className="preview-item-category">Income • Investment</div>
                                </div>
                            </div>
                            <div className="preview-stat-amount amount-income" style={{ fontSize: "1.05rem" }}>+$320.00</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section" id="features">
                <div className="section-header">
                    <div className="section-tag">Powerful Features</div>
                    <h2 className="section-title">Everything You Need to Master Money</h2>
                    <p className="section-description">
                        Designed for speed, clarity, and precision so you always know where your money goes.
                    </p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                            </svg>
                        </div>
                        <h3 className="feature-card-title">Real-Time Transactions</h3>
                        <p className="feature-card-text">
                            Add, edit, and organize transactions with instant balance updates and responsive filtering.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="20" x2="18" y2="10"></line>
                                <line x1="12" y1="20" x2="12" y2="4"></line>
                                <line x1="6" y1="20" x2="6" y2="14"></line>
                            </svg>
                        </div>
                        <h3 className="feature-card-title">Insightful Analytics</h3>
                        <p className="feature-card-text">
                            Visual summary cards clearly distinguish your total income, expenses, and net cash flow at a glance.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </div>
                        <h3 className="feature-card-title">Secure & Private</h3>
                        <p className="feature-card-text">
                            Protected with JSON Web Tokens (JWT) and Bcrypt cryptographic hashing for complete user privacy.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                        </div>
                        <h3 className="feature-card-title">Fast & Cloud-Native</h3>
                        <p className="feature-card-text">
                            Built with modern React 19, Vite, and high-performance Python FastAPI backend for sub-second speeds.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                            </svg>
                        </div>
                        <h3 className="feature-card-title">Custom Categorization</h3>
                        <p className="feature-card-text">
                            Categorize entries by salary, groceries, entertainment, utilities, and investments seamlessly.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                <line x1="12" y1="17" x2="12" y2="21"></line>
                            </svg>
                        </div>
                        <h3 className="feature-card-title">Fully Responsive</h3>
                        <p className="feature-card-text">
                            Enjoy an optimized experience across your desktop, laptop, tablet, and mobile smartphone.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="steps-section" id="how-it-works">
                <div className="section-header">
                    <div className="section-tag">Easy Setup</div>
                    <h2 className="section-title">Get Started in 3 Simple Steps</h2>
                    <p className="section-description">
                        No complex configurations. Start tracking your financial flow in less than a minute.
                    </p>
                </div>

                <div className="steps-grid">
                    <div className="step-card">
                        <div className="step-number">1</div>
                        <h3 className="step-card-title">Create an Account</h3>
                        <p className="step-card-desc">
                            Register with your name and email. Your credentials are fully protected with industry-standard encryption.
                        </p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">2</div>
                        <h3 className="step-card-title">Log Transactions</h3>
                        <p className="step-card-desc">
                            Enter your daily income and expense entries with clear labels, dates, and amounts.
                        </p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">3</div>
                        <h3 className="step-card-title">Gain Financial Clarity</h3>
                        <p className="step-card-desc">
                            Monitor your net balance, identify spending patterns, and stay on budget effortlessly.
                        </p>
                    </div>
                </div>
            </section>

            {/* Bottom Call to Action */}
            <section className="cta-section">
                <div className="cta-banner">
                    <h2 className="cta-title">Ready to Transform Your Finances?</h2>
                    <p className="cta-subtitle">
                        Join FinanceFlow today and take the first step toward financial freedom.
                    </p>
                    <Link to={token ? "/dashboard" : "/register"} className="btn-hero-primary">
                        {token ? "Go to Dashboard" : "Create Free Account"}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="home-footer">
                <div className="home-footer-inner">
                    <div className="footer-copy">
                        © {new Date().getFullYear()} FinanceFlow. Empowering smart personal financial management.
                    </div>
                    <div className="footer-links">
                        <Link to="/login" className="footer-link">Login</Link>
                        <Link to="/register" className="footer-link">Register</Link>
                        <Link to="/dashboard" className="footer-link">Dashboard</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;