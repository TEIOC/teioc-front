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

export const fetchInternById = async (intern_id) => {
	try {
		const response = await axiosInstance.get(`/interns/${intern_id}`);
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

export const fetchPathwaysForIntern = async (intern_id) => {
	try {
		const response = await axiosInstance.get(`/pathways/intern/${intern_id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching pathways:', error);
		throw error;
	}
};

export const fetchAvailableSurveys = async (intern_id) => {
	try {
		const response = await axiosInstance.get(`/surveys/available-surveys/${intern_id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching available surveys:', error);
		throw error;
	}
};

export const fetchCompletedSurveyDetails = async (intern_id, survey_id) => {
	try {
		const response = await axiosInstance.get(`/pathwayanswers/completed/${intern_id}/${survey_id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching completed survey details:', error);
		throw error;
	}
};

export const updateIntern = async (id, internData) => {
	try {
		const response = await axiosInstance.put(`/interns/${id}`, internData);
		return response.data;
	} catch (error) {
		console.error('Error updating intern:', error);
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

export const createPathway = async (pathwayData) => {
	try {
		const response = await axiosInstance.post('/pathways', pathwayData);
		return response.data;
	} catch (error) {
		console.error('Error creating pathway:', error);
		throw error;
	}
};

export const fetchSurveyWithQuestions = async (survey_id) => {
	try {
		const response = await axiosInstance.get(`/surveys/${survey_id}/questions-answers`);
		return response.data;
	} catch (error) {
		console.error('Error fetching survey with questions:', error);
		throw error;
	}
};

export const submitSurveyResponses = async (survey_id, responses) => {
	try {
		const response = await axiosInstance.post(`/pathwayanswers/${survey_id}`, { responses });
		return response.data;
	} catch (error) {
		console.error('Error submitting survey responses:', error);
		throw error;
	}
};

export const submitPathway = async (survey_id, intern_id, score, duration) => {
	try {
		const response = await axiosInstance.post('/pathways/save-answers', {
			intern_id: intern_id,
			survey_id: survey_id,
			score: score,
			duration: duration
		});
		return response.data;
	} catch (error) {
		console.error('Error submitting pathway:', error);
		throw error;
	}
};
export const submitSurveyAnswers = async (survey_id, intern_id, answers, formattedDuration) => {
	try {
		const formattedAnswers = Object.keys(answers).map(questionId => ({
			intern_id: intern_id,
			survey_id: survey_id,
			question_id: parseInt(questionId),
			answer_id: answers[questionId],
		}));

		const response = await axiosInstance.post('/pathwayanswers/save-answers', {
			intern_id: intern_id,
			survey_id: survey_id,
			answers: formattedAnswers,
			duration: formattedDuration // Assuming your backend expects a string in 'HH:MM:SS' format
		});
		return response.data;
	} catch (error) {
		console.error('Error submitting survey answers:', error);
		throw error;
	}
};

