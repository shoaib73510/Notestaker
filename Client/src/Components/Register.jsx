import { Link } from "react-router-dom";
import React, { useState } from 'react';
import authService from "../Services/authService.js";
import './Reg.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState(null);

    // Handle input changes with a reusable handler
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        const { username, email, password } = formData;
        if (!username || !email || !password) return "All fields are required.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return "Invalid email format.";
        if (password.length < 6) return "Password must be at least 6 characters.";
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
            await authService.register(formData);
            alert('Registration Successful');
            setError(null); // Clear error on success
        } catch (err) {
            setError(err.response?.data?.msg || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bgm">
            <div className="card p-4 shadow-lg">
                <form onSubmit={onSubmit}>
                    <h2 className="text-center mb-4">Register</h2>
                    <div className="form-group">
                        <label htmlFor="username">User Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={onChange}
                            placeholder="Enter user name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={onChange}
                            placeholder="Enter email"
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
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">Register</button>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                    <div className="text-center mt-3">
                        <Link to="/login">Already a user? Click here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
