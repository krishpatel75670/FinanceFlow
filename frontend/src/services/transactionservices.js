import axios from "axios";

const rawApiUrl = import.meta.env.VITE_API_URL || "";
const API_URL = rawApiUrl.replace(/\/+$/, "");

export async function addTransaction(transactionData) {
    const token = localStorage.getItem("access_token");

    const response = await axios.post(
        `${API_URL}/transactions/add`,
        transactionData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}


export async function getTransactions() {
    const token = localStorage.getItem("access_token");

    const response = await axios.get(
        `${API_URL}/transactions/all-transactions`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}

export async function updateTransaction(id, transactionData) {
    const token = localStorage.getItem("access_token");

    const response = await axios.put(
        `${API_URL}/transactions/${id}`,
        transactionData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}

export async function deleteTransaction(id) {
    const token = localStorage.getItem("access_token");

    const response = await axios.delete(
        `${API_URL}/transactions/delete/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}