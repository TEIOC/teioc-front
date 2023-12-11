import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://localhost:8080",
	headers: {
		"Content-Type": "application/json",
		"Accept": "*/*",
		"Access-Control-Allow-Origin": "*", // Cet en-tête est également généralement contrôlé par le serveur
	},
});

// Ajouter le JWT à chaque requête si disponible
axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem("jwt");
	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`;
	}
	return config;
});

export default axiosInstance;
