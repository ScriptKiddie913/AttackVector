import axios from 'axios';
import AuthService from './auth';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = AuthService.getAuthToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle auth errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized, logout user
      AuthService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

class ApiService {
  // User endpoints
  async getProfile() {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw error.response.data.detail || 'Failed to fetch profile';
    }
  }

  // Challenge endpoints
  async getChallenges() {
    try {
      const response = await api.get('/challenges/');
      return response.data;
    } catch (error) {
      throw error.response.data.detail || 'Failed to fetch challenges';
    }
  }

  async getChallenge(id) {
    try {
      const response = await api.get(`/challenges/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data.detail || 'Failed to fetch challenge';
    }
  }

  async submitFlag(challengeId, flag) {
    try {
      const response = await api.post(`/challenges/${challengeId}/submit`, { flag });
      return response.data;
    } catch (error) {
      throw error.response.data.detail || 'Failed to submit flag';
    }
  }

  // Category endpoints
  async getCategories() {
    try {
      const response = await api.get('/categories/');
      return response.data;
    } catch (error) {
      throw error.response.data.detail || 'Failed to fetch categories';
    }
  }

  // Scoreboard endpoints
  async getScoreboard() {
    try {
      const response = await api.get('/scoreboard/');
      return response.data;
    } catch (error) {
      throw error.response.data.detail || 'Failed to fetch scoreboard';
    }
  }

  // Admin endpoints
  async createChallenge(challengeData) {
    try {
      const response = await api.post('/challenges/', challengeData);
      return response.data;
    } catch (error) {
      throw error.response.data.detail || 'Failed to create challenge';
    }
  }

  async updateChallenge(id, challengeData) {
    try {
      const response = await api.put(`/challenges/${id}`, challengeData);
      return response.data;
    } catch (error) {
      throw error.response.data.detail || 'Failed to update challenge';
    }
  }

  async deleteChallenge(id) {
    try {
      const response = await api.delete(`/challenges/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data.detail || 'Failed to delete challenge';
    }
  }
}

export default new ApiService();