import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar({ activePage }) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                Finance<span className="navbar-brand-accent">Flow</span>
            </div>
            <div className="navbar-links">
                <Link 
                    to="/dashboard" 
                    className={`nav-link ${activePage === "dashboard" ? "active" : ""}`}
                >
                    Dashboard
                </Link>
                <Link 
                    to="/transactions" 
                    className={`nav-link ${activePage === "transactions" ? "active" : ""}`}
                >
                    Transactions
                </Link>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default Navbar;
