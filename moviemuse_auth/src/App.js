// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/dashboard'; 
import PrivateRoute from './components/Auth/PrivateRoute';
import { Navigate } from 'react-router-dom'
import PasswordResetConfirm from './components/Auth/PasswordResetConfirmation';

function App() {
    useEffect(() => {
        document.title = "Movie Muse"; // Change the title here
      }, []);
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                    path="/dashboard" 
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } 
                />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/password-reset-confirm/:uidb64/:token" element={<PasswordResetConfirm />} />
            </Routes>
        </Router>
    );
}

export default App;
