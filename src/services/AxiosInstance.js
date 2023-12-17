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

// Add a response interceptor
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// If the error status is 401 and there is no originalRequest._retry flag,
		// it means the token has expired and we need to refresh it
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = localStorage.getItem('refreshToken');
				// Send a request to the /auth/refresh-token endpoint to refresh the token with the refresh token in body
				const response = await axiosInstance.post('/auth/refresh-token', {
					refreshToken,
				});

				const { token: newToken, refreshToken: newRefreshToken } = response.data;

				localStorage.setItem('jwt', newToken);
				localStorage.setItem('refreshToken', newRefreshToken);

				// Retry the original request with the new token
				originalRequest.headers.Authorization = `Bearer ${newToken}`;
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				console.error(refreshError);
				// Handle refresh token error or redirect to login
				// Vous pouvez rediriger l'utilisateur vers la page de connexion ici
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
