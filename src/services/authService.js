import axios from "axios";
const baseURL = "http://localhost:8080";

const getToken = () => {
    return localStorage.getItem('jwt');
};

const isAuthenticated = () => {
    const token = getToken();
    return !!token;
};

const login = async (credentials) => {
    try {
        const response = await axios.post(`${baseURL}/auth/login`, credentials);
        const token = response.data.token;
        if (token) {
            localStorage.setItem('jwt', token);
        } else {
            console.error('Token not received');
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('jwt');
};

export { getToken, isAuthenticated, login, logout };

