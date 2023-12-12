export const getToken = () => {
    return localStorage.getItem('jwt');
};

export const isAuthenticated = () => {
    const token = getToken();
    // You can add logic to check if the token is still valid here
    return !!token;
};

export const logout = () => {
    localStorage.removeItem('jwt');
};