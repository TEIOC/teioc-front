const getToken = () => {
    return localStorage.getItem('jwt');
};

const isAuthenticated = () => {
    const token = getToken();
    return !!token;
};

const logout = () => {
    localStorage.removeItem('jwt');
};

export { getToken, isAuthenticated, logout };


