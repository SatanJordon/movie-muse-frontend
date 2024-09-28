// src/components/Auth/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otpMessage, setOtpMessage] = useState('');
    const [canResendOtp, setCanResendOtp] = useState(false);
    const [timer, setTimer] = useState(60); // Timer for 60 seconds
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); 
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);
        try {
            // Call the register API
            // setLoading(true);
            await AuthService.register(username, email, password);
            // setLoading(false);
            setIsOtpSent(true); // Show OTP input after successful registration
            setOtpMessage("Registration successful! Please check your email for the OTP."); // Set the OTP message
            setCanResendOtp(false); // Reset resend flag
            startTimer();
        } catch (err) {
            // Check the error response to provide specific feedback
            if (err.response && err.response.status === 400) {
                if (err.response.data.message === 'Email is already registered.') {
                    setError('This email is already registered. Please check your inbox for the OTP or click on "Resend OTP".');
                    setIsOtpSent(true); // Show OTP input to allow verification
                } else {
                    setError('Failed to register');
                }
            } else {
                setError('Failed to register');
            }
        }finally{
            setLoading(false);
        }
    };
    const handleValidateOtp = async (e) => {
        e.preventDefault();
        setError(''); 
        setLoading(true);
        try {
            // Assuming you have an API to validate the OTP
            await AuthService.validateOtp(email, otp); // Update with your validation method
            setOtpMessage("OTP validation successful! You can now log in."); // Set success message for OTP validation
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError('Failed to validate OTP');
        }
        finally {
            setLoading(false);  // Stop loading after validation
        }
    };
    const startTimer = () => {
        setTimer(60);
        const interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer <= 1) {
                    clearInterval(interval);
                    setCanResendOtp(true); // Allow resend after 60 seconds
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
    };
    const handleResendOtp = async () => {
        setError('');
        setLoading(true);
        try {
            await AuthService.resendOtp(email); // Call the resend OTP API
            setOtpMessage("A new OTP has been sent to your email.");
            startTimer(); // Restart the timer
        } catch (err) {
            setError('Failed to resend OTP');
        }finally {
            setLoading(false);  // Stop loader after resend completes
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="text-center text-2xl font-bold mb-4">{isOtpSent ? "Verify Your OTP" : "Create an Account"}</div>
                {error && <p className="text-red-500">{error}</p>}
                {otpMessage && <p className="text-green-500">{otpMessage}</p>}
                {!isOtpSent ? (
                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                                placeholder="Enter your username"
                                required
                                disabled={loading} // Disable input when loading
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                                placeholder="Enter your Email"
                                required
                                disabled={loading} // Disable input when loading
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
                                disabled={loading} // Disable input when loading
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                                placeholder="Confirm your password"
                                required
                                disabled={loading} // Disable input when loading
                            />
                        </div>
                        <button 
                            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md"
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleValidateOtp}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md"
                                placeholder="Enter the OTP sent to your email"
                                required
                                disabled={loading} // Disable input when loading
                            />
                        </div>
                        <button 
                            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md"
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? 'Validating OTP...' : 'Validate OTP'}
                        </button>
                        {canResendOtp && (
                            <div className="mt-4">
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    className="text-indigo-600 hover:underline"
                                    disabled={loading} // Disable button when loading
                                >
                                    {loading ? 'Resending OTP...' : 'Resend OTP'}
                                </button>
                            </div>
                        )}
                        {!canResendOtp && (
                            <p className="text-sm text-gray-600">
                                You can resend the OTP in {timer} seconds.
                            </p>
                        )}
                    </form>
                )}
                <div className="mt-4 text-center">
                    <p className="text-sm">Already have an account? <a href="/login" className="text-indigo-600">Login</a></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
