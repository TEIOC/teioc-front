import axios from 'axios';
import redirectToLogin from './RedirectToLogin.js'; // Assurez-vous que le chemin est correct
import { jwtDecode } from "jwt-decode";

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

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 const refreshToken = localStorage.getItem('refreshToken');
//                 if (!refreshToken) {
//                     redirectToLogin();
//                     return Promise.reject(error);
//                 }

//                 // Vérifiez si le refreshToken est expiré
//                 const decoded = jwtDecode(refreshToken);
//                 if (decoded.exp * 1000 < Date.now()) {
//                     localStorage.removeItem('jwt');
//                     localStorage.removeItem('refreshToken');
//                     redirectToLogin();
//                     return Promise.reject(error); // Le refreshToken est expiré
//                 }

//                 const response = await axiosInstance.post('/auth/refresh-token', { refreshToken });
//                 const { token, refreshToken: newRefreshToken } = response.data;

//                 localStorage.setItem('jwt', token);
//                 localStorage.setItem('refreshToken', newRefreshToken);

//                 originalRequest.headers.Authorization = `Bearer ${token}`;
//                 return axiosInstance(originalRequest);
//             } catch (refreshError) {
//                 console.error(refreshError);
//                 localStorage.removeItem('jwt');
//                 localStorage.removeItem('refreshToken');
//                 redirectToLogin();
//                 return Promise.reject(refreshError); // Modifié pour renvoyer l'erreur
//             }
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
