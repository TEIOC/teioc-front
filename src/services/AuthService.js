import axiosInstance from './AxiosInstance.js';

export const getToken = () => {
    return localStorage.getItem('jwt');
};

export const isAuthenticated = () => {
    const token = getToken();
    return !!token;
};

export const isTokenExpired = token => {
    const base64Url = token.split('.')[1];
    if (!base64Url) {
        throw new Error('Invalid token format');
    }

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const exp = JSON.parse(jsonPayload).exp;
    const now = Date.now() / 1000;

    return now > exp;
}

export const isTokenValid = async () => {
    console.log('Checking if token is valid...');
    const token = getToken();
    if (!token) {
        console.log('Token not found.');
        return false; // No token found
    }

    try {
        if (!isTokenExpired(token)) {
            console.log('Token is still valid.');
            return true; // Token is still valid
        } else {
            return await refreshToken(); // Token expired, try to refresh token
        }
    } catch (error) {
        console.error('Error parsing token:', error);
        return await refreshToken(); // Error in parsing, try to refresh token
    }
};


export const refreshToken = async () => {
    console.log('Refreshing token...');
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!isTokenExpired(refreshToken)) {
            const response = await axiosInstance.post('/auth/refresh-token', { refreshToken });
            console.log('Refresh token response:', response);
            if (response.data && response.data.token && response.data.refreshToken) {
                console.log('Token refreshed');
                localStorage.setItem('jwt', response.data.token);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                return true;
            }
        }

        localStorage.removeItem('jwt');
        localStorage.removeItem('refreshToken');
        console.log('Token removed');
        return false;
    } catch (error) {
        console.error('Error refreshing token:', error);
        return false;
    }
};

export const getEmailFromToken = () => {
    const token = getToken();
    if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload).sub;
    }
    return null;
};


export const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
};