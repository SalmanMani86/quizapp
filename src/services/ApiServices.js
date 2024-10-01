import axios from "axios";

// Base URL for your API
const baseURL = ' http://localhost:3000';

const ApiServices = {
  init() {
    axios.defaults.baseURL = baseURL;
    axios.defaults.headers.common["Content-Type"] = "application/json";
  },
  getAuthHeader() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: "Bearer " + token } : {};
  },
  async GetRequest(url) {
    try {
      console.log("Making GET request to:", url);
      const response = await axios.get(url, {
        headers: { ...this.getAuthHeader() },
      });
      return response.data;
    } catch (error) {
      console.error("GET request failed:", error);
      throw error;
    }
  },
  async PostRequest(url, data) {
    try {
      console.log("Making POST request to:", url, "with data:", data);
      const response = await axios.post(url, data, {
        headers: { ...this.getAuthHeader() },
      });
      return response.data;
    } catch (error) {
      console.error("POST request failed:", error);
      throw error;
    }
  },
  async authenticate(userData) {
    try {
      const response = await this.GetRequest(`/users?email=${userData.email}`);
      const user = response[0]; // Assuming the response is an array
  
      if (user && user.password === userData.password) {
        const token = 'fake-jwt-token'; // Example token logic
        localStorage.setItem('token', token);
        return { token, user }; // Ensure this returns the user object correctly
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error; // Propagate the error
    }
  }
  
  ,

  async fetchUserData() {
    try {
      return await this.GetRequest('/users/me');
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      throw error;
    }
  },

  logout() {
    localStorage.removeItem("token");
  },
};

export default ApiServices;
