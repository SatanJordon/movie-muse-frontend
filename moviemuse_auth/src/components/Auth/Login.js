import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';

const Login = () => {
    const [username_or_email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [showReset, setShowReset] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    const handleLogin  = async (e) => {
        e.preventDefault();
        try {
            await AuthService.login(username_or_email, password);  // Use username instead of email
            navigate('/dashboard');  // Redirect to the dashboard on successful login
        } catch (err) {
            setError('Invalid credentials, please try again.');
        }
    };
    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await AuthService.passwordReset(email);
            alert('OTP sent to your email.');
            setShowReset(false);
            setShowConfirm(true);
        } catch (err) {
            setError('Failed to send OTP.');
        }
    };
    const handlePasswordResetConfirm = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await AuthService.passwordResetConfirm(email, otp, newPassword);
            alert('Password has been reset successfully.');
            setShowConfirm(false); // Close the confirmation modal or form
        } catch (err) {
            setError('Failed to reset password.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="text-center text-2xl font-bold mb-4">Login to Your Account</div>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Username or Email</label>
                        <input
                            type="text"
                            value={username_or_email}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                            placeholder="Enter your username or email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md">
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm cursor-pointer text-indigo-600" onClick={() => setShowReset(true)}>Forgot Password?</p>
                    <p className="text-sm">Don't have an account? <a href="/register" className="text-indigo-600">Register</a></p>
                </div>

                {/* Password Reset Form */}
                {showReset && (
                    <form onSubmit={handlePasswordReset} className="mt-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Enter your Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md">
                            Send OTP
                        </button>
                    </form>
                )}

                {/* Password Reset Confirmation Form */}
                {showConfirm && (
                    <form onSubmit={handlePasswordResetConfirm} className="mt-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                                placeholder="Enter the OTP"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                                placeholder="Enter your new password"
                                required
                            />
                        </div>
                        <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md">
                            Reset Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
