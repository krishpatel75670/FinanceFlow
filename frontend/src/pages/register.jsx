import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/authservices";

import "../css/login.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsLoading(true);
        try {
            const data = await registerUser(name, email, password);
            console.log("Registration successful:", data);
            navigate("/login");
        } catch (err) {
            console.error("Registration failed:", err);
            const serverMsg = err.response?.data?.detail;
            setError(typeof serverMsg === "string" ? serverMsg : "Registration failed. Please verify your details.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="auth-page-wrapper">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Create <span className="auth-title-accent">Account</span></h1>
                    <p className="auth-subtitle">Join FinanceFlow today to track your finances</p>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            className="auth-input"
                            placeholder="Enter your full name"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="auth-form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="auth-input"
                            placeholder="Enter your Email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="auth-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="auth-input"
                            placeholder="Enter your Password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="auth-form-group">
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password"
                            className="auth-input"
                            placeholder="Confirm your Password"
                            value={confirmPassword}
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button className="auth-btn-submit" type="submit" disabled={isLoading}>
                        {isLoading ? "Registering..." : "Register"}
                    </button>
                </form>

                <div className="auth-footer">
                    <Link to="/login" className="auth-link">Already have an account? Login here</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;