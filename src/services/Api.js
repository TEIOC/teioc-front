import axiosConfig from "./AxiosConfig";

const API_BASE_URL = "http://localhost:8080";

export const fetchInterns = async () => {
	try {
		const response = await axiosConfig.get("/interns");
		return response.data;
	} catch (error) {
		console.error("Error fetching interns:", error);
		throw error;
	}
};

export const fetchInternById = async (id) => {
	try {
		const response = await fetch(`${API_BASE_URL}/interns/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching intern: ", error);
		throw error;
	}
};

export const fetchTopics = async () => {
	try {
		// const response = await fetch(`${API_BASE_URL}/topics`);
		const response = await axiosConfig.get("/topics");
    return response.data;
	} catch (error) {
		console.error("Error fetching topics:", error);
		throw error;
	}
};

export const fetchSurveys = async () => {
	try {
		// const response = await fetch(`${API_BASE_URL}/surveys`);
		const response = await axiosConfig.get("/surveys");
		return response.data;
	} catch (error) {
		console.error("Error fetching surveys:", error);
		throw error;
	}
};

export const activateIntern = async (id) => {
	try {
		// const response = await fetch(`${API_BASE_URL}/interns/${id}/activate`, {
		// 	method: "PUT",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// });

		// if (!response.ok) {
		// 	throw new Error("Network response was not ok");
		// }

		// const data = await response.json();
		// return data;
    const response = await axiosConfig.put(`/interns/${id}/activate`);
    return response.data;
	} catch (error) {
		console.error("Error activating intern:", error);
		throw error;
	}
};

export const deactivateIntern = async (id) => {
	try {
		// const response = await fetch(`${API_BASE_URL}/interns/${id}/deactivate`, {
		// 	method: "PUT",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// });

		// if (!response.ok) {
		// 	throw new Error("Network response was not ok");
		// }

		// const data = await response.json();
		// return data;

    const response = await axiosConfig.put(`/interns/${id}/deactivate`);
    return response.data;
	} catch (error) {
		console.error("Error deactivating intern:", error);
		throw error;
	}
};
