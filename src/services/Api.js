import axiosInstance from './AxiosInstance';

export const fetchInterns = async () => {
	try {
		const response = await axiosInstance.get('/interns');
		return response.data;
	} catch (error) {
		console.error('Error fetching interns:', error);
		throw error;
	}
};

export const fetchInternById = async (id) => {
	try {
		const response = await axiosInstance.get(`/interns/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching intern: ', error);
		throw error;
	}
};

export const fetchInternByEmail = async (email) => {
	try {
		const response = await axiosInstance.get(`/interns/email/${email}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching intern info:', error);
		throw error;
	}
};

export const fetchTopics = async () => {
	try {
		const response = await axiosInstance.get('/topics');
		return response.data;
	} catch (error) {
		console.error('Error fetching topics:', error);
		throw error;
	}
};

export const fetchSurveys = async () => {
	try {
		const response = await axiosInstance.get('/surveys');
		return response.data;
	} catch (error) {
		console.error('Error fetching surveys:', error);
		throw error;
	}
};

export const activateIntern = async (id) => {
	try {
		const response = await axiosInstance.put(`/interns/${id}/activate`);
		return response.data;
	} catch (error) {
		console.error('Error activating intern:', error);
		throw error;
	}
};

export const deactivateIntern = async (id) => {
	try {
		const response = await axiosInstance.put(`/interns/${id}/deactivate`);
		return response.data;
	} catch (error) {
		console.error('Error deactivating intern:', error);
		throw error;
	}
};

