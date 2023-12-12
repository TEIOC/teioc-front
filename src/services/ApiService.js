import { getToken } from './AuthService';

const makeAuthenticatedRequest = async (url, options = {}) => {
    const token = getToken();
    const headers = new Headers(options.headers || {});

    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }

    const newOptions = { ...options, headers };

    try {
        const response = await fetch(url, newOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response;
    } catch (error) {
        console.error('Error making authenticated request:', error);
        throw error;
    }
};

export { makeAuthenticatedRequest };
