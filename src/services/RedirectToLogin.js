function redirectToLogin() {
    if (window.location.pathname !== "/login") {
        window.location.href = '/login';
    }
}

export default redirectToLogin;