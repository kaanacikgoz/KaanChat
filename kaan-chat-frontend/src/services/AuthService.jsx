import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/';

class AuthService {
  async register(user) {
    const response = await axios.post(`${API_URL}register`, user)
    return response.data;
  }

  async login(username, password) {
    const response = await axios.post(`${API_URL}login`, {
      username,
      password,
    });
    return response.data;
  }

  setAuthToken(token) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }

}

export default new AuthService();