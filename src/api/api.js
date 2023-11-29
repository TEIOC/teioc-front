const API_BASE_URL = 'http://localhost:8080'; // L'URL de base de votre API

// Fonction pour récupérer la liste des stagiaires depuis l'API
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
    throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant.
  }
};


// Fonction pour récupérer la liste des sujets depuis l'API
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
    throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant.
  }
};