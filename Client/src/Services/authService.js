
import axios from 'axios';

const API_URL = 'http://localhost:8086/api/Notestaker/auth/';

const register = async (userData) => {
    const response = await axios.post(`${API_URL}reg`, userData);
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(`${API_URL}login`, userData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('token');
};

export default { register, login, logout };
