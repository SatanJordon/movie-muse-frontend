import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../Auth/AuthService';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();  // Call the logout function
        navigate('/login');  // Redirect to the login page
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
                <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard!</h1>
                <p className="text-gray-600">This is a simple dashboard after a successful login.</p>
                <button 
                    onClick={handleLogout} 
                    className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
