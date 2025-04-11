import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from '../Services/authService.js';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        const { email, password } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) return "Enter a valid email address.";
        if (!password) return "Password is required.";
        return null;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        try {
            await authService.login(formData);
            setError(null); // Clear previous errors
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || "Login failed. Please try again.");
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bgm">
            <div className="card p-4 shadow-lg">
                <form onSubmit={onSubmit}>
                    <h2 className="text-center mb-4">User Login</h2>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={onChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={onChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                    <div className="text-center mt-3">
                        <Link to="/">New user? Register here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
