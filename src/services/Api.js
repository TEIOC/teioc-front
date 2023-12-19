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
		console.error('Error fetching pathways for intern:', error);
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

export const fetchQuestionsAndAnswersForSurvey = async (survey_id) => {
	try {
		console.log('Fetching questions and answers for survey:', survey_id);
		const response = await axiosInstance.get(`/questions/surveys/${survey_id}/with-answers`);
		console.log('Received response for questions and answers:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error fetching questions and answers:', error);
		throw error;
	}
};

export const createPathway = async (intern_id, survey_id, duration) => {
	try {
		console.log('Sending Duration to Backend:', duration);
		const response = await axiosInstance.post('/pathways', { intern_id, survey_id, duration });
		return response.data;
	} catch (error) {
		console.error('Error creating pathway:', error);
		throw error;
	}
};


export const saveInternAnswers = async (answers) => {
	try {
		const response = await axiosInstance.post('/pathwayanswers/save-answers', answers);
		return response.data;
	} catch (error) {
		console.error('Error saving answers:', error);
		throw error;
	}
};

export const updatePathwayScore = async (intern_id, survey_id) => {
	try {
		const response = await axiosInstance.put(`/pathways/${intern_id}/${survey_id}/update-score`);
		return response.data;
	} catch (error) {
		throw error;
	}
};


export const fetchSurveyById = async (survey_id) => {
	try {
		const response = await axiosInstance.get(`/surveys/${survey_id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching survey by ID:', error);
		throw error;
	}
};

export const fetchOverallPerformance = async () => {
	try {
		const response = await axiosInstance.get('/statistics/overall-performance');
		return response.data;
	} catch (error) {
		console.error('Error fetching overall performance:', error);
		throw error;
	}
};

export const fetchSurveyWisePerformance = async () => {
	try {
		const response = await axiosInstance.get('/statistics/survey-performance');
		return response.data;
	} catch (error) {
		console.error('Error fetching survey-wise performance:', error);
		throw error;
	}
};

export const fetchIndividualPerformance = async (intern_id) => {
	try {
		const response = await axiosInstance.get(`/statistics/individual-performance/${intern_id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching individual performance:', error);
		throw error;
	}
};

export const fetchTopicWisePerformance = async () => {
	try {
		const response = await axiosInstance.get('/statistics/topic-performance');
		return response.data;
	} catch (error) {
		console.error('Error fetching topic-wise performance:', error);
		throw error;
	}
};

export const fetchTopicWisePerformanceForIntern = async (intern_id) => {
	try {
		const response = await axiosInstance.get(`/statistics/topic-performance/${intern_id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching topic-wise performance for intern:', error);
		throw error;
	}
};

export const fetchSurveyPerformanceForIntern = async (internId) => {
	try {
		const response = await axiosInstance.get(`/statistics/survey-performance/intern/${internId}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching survey performance for intern:', error);
		throw error;
	}
};

export const fetchTopicPerformanceForIntern = async (internId) => {
	try {
		const response = await axiosInstance.get(`/statistics/topic-performance/intern/${internId}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching topic performance for intern:', error);
		throw error;
	}
};


export const updateLastConnection = async (id) => {
	if (typeof id !== 'number') {
		console.error('Invalid ID type:', id);
		return;
	}

	try {
		const token = localStorage.getItem('jwt');
		await axiosInstance.put(`/interns/${id}/update-last-connection`, {}, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	} catch (error) {
		console.error('Error updating last connection:', error);
		throw error;
	}
};

export const fetchInternRankingBySurvey = async (surveyId) => {
	try {
		const response = await axiosInstance.get(`/statistics/ranking/survey/${surveyId}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching intern ranking by survey:', error);
		throw error;
	}
};

export const fetchInternRankingByTopic = async (topicId) => {
	try {
		const response = await axiosInstance.get(`/statistics/ranking/topic/${topicId}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching intern ranking by topic:', error);
		throw error;
	}
};

// Dans services/Api.js
export const fetchSurveyPerformance = async () => {
	try {
		const response = await axiosInstance.get('/statistics/survey-performance/all');
		return response.data; // Assurez-vous que response.data est un tableau
	} catch (error) {
		console.error('Error fetching survey performance:', error);
		throw error;
	}
};

export const fetchTopicPerformance = async () => {
	try {
		const response = await axiosInstance.get('/statistics/topic-performance/all');
		return response.data; // Assurez-vous que response.data est un tableau
	} catch (error) {
		console.error('Error fetching topic performance:', error);
		throw error;
	}
};

export const fetchQuestionsCountBySurvey = async (surveyId) => {
	try {
		const response = await axiosInstance.get(`questions/surveys/${surveyId}/questions-count`);
		return response.data;
	} catch (error) {
		console.error('Error fetching questions count by survey:', error);
		throw error;
	}
};


