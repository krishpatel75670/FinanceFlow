import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/authservices";
import { useAuth } from "../context/AuthContext";

import "../css/login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const data = await loginUser(email, password);
            if (data && data.access_token) {
                login(data.access_token);
                navigate("/dashboard");
            } else {
                setError("Login failed. No access token received from server.");
            }
        } catch (err) {
            console.error("Login failed:", err);
            const serverMsg = err.response?.data?.detail;
            setError(typeof serverMsg === "string" ? serverMsg : "Invalid email or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="auth-page-wrapper">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Finance<span className="auth-title-accent">Flow</span></h1>
                    <p className="auth-subtitle">Sign in to manage your transactions</p>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="auth-input"
                            placeholder="Enter your registered Email"
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

                    <button className="auth-btn-submit" type="submit" disabled={isLoading}>
                        {isLoading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <div className="auth-footer">
                    <Link className="auth-link" to="/register">Don't have an account? Register here</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;