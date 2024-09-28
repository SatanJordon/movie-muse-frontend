// src/components/Auth/PasswordResetConfirm.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthService from './AuthService';

const PasswordResetConfirm = () => {
    const { uidb64, token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await AuthService.passwordResetConfirm(uidb64, token, newPassword);
            alert('Password reset successful! You can now log in.');
            navigate('/login'); // Redirect to login
        } catch (err) {
            setError('Failed to reset password');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
            />
            <button type="submit">Reset Password</button>
            <p className="text-red-500">{error}</p>
        </form>
    );
};

export default PasswordResetConfirm;
