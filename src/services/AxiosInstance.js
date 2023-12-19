import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
    },
});

axiosInstance.interceptors.request.use((config) => {
    // On n'ajoute le token d'accès que pour les requêtes autres que le refresh token
    if (!config.url.endsWith('/auth/refresh-token')) {
        const token = localStorage.getItem('jwt');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
