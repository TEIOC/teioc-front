import axios from "axios";

const axiosConfig = axios.create({
	baseURL: "http://localhost:8080",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		"Accept": "*/*",
		"Access-Control-Allow-Origin": "*",
	},
});

axiosConfig.interceptors.request.use((config) => {
	const token = localStorage.getItem("jwt");
	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`;
	}
	return config;
});

export default axiosConfig;
