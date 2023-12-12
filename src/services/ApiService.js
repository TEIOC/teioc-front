import { getToken } from './AuthService';

const makeAuthenticatedRequest = async (url, options = {}) => {
    const token = getToken();
    const headers = new Headers(options.headers || {});

    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }

    const newOptions = { ...options, headers };
    return fetch(url, newOptions);
};

export { makeAuthenticatedRequest };
