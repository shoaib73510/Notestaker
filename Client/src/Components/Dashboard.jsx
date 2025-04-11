import React from 'react';
import { useNavigate } from 'react-router-dom';
import Todo from './Todo';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            localStorage.removeItem('authToken'); // Clear authentication token
            alert("You have been logged out."); // Provide feedback
            navigate('/login'); // Redirect to login page
        }
    };

    return (
        <div className="dashboard bgm vh-100 d-flex flex-column">
            <header className="dashboard-header bg-dark text-light d-flex justify-content-between align-items-center p-3">
                <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
                <button className="btn btn-light logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </header>
            <main className="dashboard-main flex-grow-1 d-flex align-items-center justify-content-center bg-light">
                <Todo />
            </main>
            <footer className="dashboard-footer bg-secondary text-center p-3">
                <small className="text-light">© 2025 YourApp, All Rights Reserved</small>
            </footer>
        </div>
    );
};

export default Dashboard;
