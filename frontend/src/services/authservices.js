import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const API_URL = "";

export async function loginUser(email, password) {
    const formData = new URLSearchParams();

    formData.append("username", email);
    formData.append("password", password);

    const response = await axios.post(
        `${API_URL}/auth/login`,
        formData,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    return response.data;
}

export async function registerUser(name, email, password) {
    const response = await axios.post(
        `${API_URL}/auth/register`,
        {
            name: name,
            email: email,
            password: password,
        }
    );

    return response.data;
}

// Retain RegisterUser for backward compatibility
export const RegisterUser = registerUser;

export async function getCurrentUser() {
    const token = localStorage.getItem("access_token");

    const response = await axios.get(
        `${API_URL}/auth/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}
