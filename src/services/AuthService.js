const getToken = () => {
    return localStorage.getItem('jwt');
};

const isAuthenticated = () => {
    const token = getToken();
    // Ici, vous pouvez ajouter une logique pour vérifier si le token est toujours valide
    return !!token;
};

const logout = () => {
    localStorage.removeItem('jwt');
};

export { getToken, isAuthenticated, logout };
