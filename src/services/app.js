// src/services/api.js
import axios from 'axios';

const API_URL =  'http://localhost:5000';

const api = {
  // Get Google Auth URL
  getGoogleAuthUrl: async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/google`);
      return response.data.url;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get Google auth URL');
    }
  },
  
  // Send email using Gmail API
  sendEmail: async (userId, emailData) => {
    try {
      const response = await axios.post(`${API_URL}/api/send-email`, {
        userId,
        ...emailData
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to send email');
    }
  },

  // Alternative: Send email using SMTP (fallback)
  sendEmailSMTP: async (userId, emailData) => {
    try {
      const response = await axios.post(`${API_URL}/api/send-email-smtp`, {
        userId,
        ...emailData
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to send email via SMTP');
    }
  },

  // Test Gmail API connection
  testGmailAPI: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/api/test-gmail-api/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Gmail API test failed');
    }
  }
};

export default api;