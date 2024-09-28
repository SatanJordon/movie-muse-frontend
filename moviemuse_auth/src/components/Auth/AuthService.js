// src/components/Auth/AuthService.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:8000/moviemuse/interactive/auth/'; // Update with your backend URL

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            logout();

            const navigate = useNavigate();
            navigate('/login');

            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

const login = async (username_or_email, password) => {
    const response = await axios.post(`${API_URL}login`, {
        username_or_email, password
    });

    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    return response.data;  // Return tokens if needed
};

const logout = () => {
    // Clear the tokens from local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post(`${API_URL}token/refresh/`, {
        refresh: refreshToken
    });

    // Update the access token in localStorage
    localStorage.setItem('accessToken', response.data.access);

    return response.data.access;  // Return the new access token
};

const register = async (username, email, password) => {
    await axios.post(`${API_URL}register`, {
        username, email, password
    });
};
const validateOtp = async (email, otp) => {
    await axios.post(`${API_URL}verify-otp`, {
        email,
        otp
    });
};
const resendOtp = async (email) => {
    await axios.post(`${API_URL}resend-otp`, {
        email
    });
};

const passwordReset = async (email) => {
    await axios.post(`${API_URL}password-reset`, { email });
};

const passwordResetConfirm = async (email, otp, newPassword) => {
    await axios.post(`${API_URL}password-reset-confirm`, { email, otp, new_password: newPassword });
};
const AuthService = {
    login,
    refreshToken,
    register,
    logout,
    validateOtp,
    resendOtp,
    passwordReset,
    passwordResetConfirm
};

export default AuthService;
