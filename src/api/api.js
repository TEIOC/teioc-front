const API_BASE_URL = 'http://localhost:8080';

export const fetchInterns = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/interns`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching interns:', error);
    throw error;
  }
};

export const fetchTopics = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/topics`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
};

export const fetchSurveys = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/surveys`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching surveys:', error);
    throw error;
  }
};