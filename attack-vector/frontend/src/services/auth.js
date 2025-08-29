import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class AuthService {
  // Register a new user
  async register(username, email, password) {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw error.response.data.detail || 'Registration failed';
    }
  }

  // Login user
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username: email,
        password
      });
      
      if (response.data.access_token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error) {
      throw error.response.data.detail || 'Login failed';
    }
  }

  // Logout user
  logout() {
    localStorage.removeItem('user');
  }

  // Get current user from local storage
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Check if user is logged in
  isLoggedIn() {
    const user = this.getCurrentUser();
    return !!user;
  }

  // Get auth token
  getAuthToken() {
    const user = this.getCurrentUser();
    return user ? `Bearer ${user.access_token}` : null;
  }
}

export default new AuthService();