import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const fetchPlaces = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/places`);
    return response.data;
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
};
