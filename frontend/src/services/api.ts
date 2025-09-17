import axios from 'axios';
import { DocumentData, VerificationResponse } from '../types';

// Configuration: Change this URL to match your FastAPI backend
const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout for file uploads
});

// Request interceptor for adding auth headers if needed
api.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Upload certificate file - connects to your /upload/ endpoint
  uploadCertificate: async (file: File): Promise<DocumentData> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },

  // Verify certificate (you'll need to add this endpoint to your backend)
  verifyCertificate: async (file: File): Promise<VerificationResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/verify-certificate/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },

  // Save student details (you'll need to add this endpoint)
  saveStudentDetails: async (studentData: any) => {
    const response = await api.post('/students/', studentData);
    return response.data;
  },

  // Get all students (you'll need to add this endpoint)
  getStudents: async () => {
    const response = await api.get('/students/');
    return response.data;
  },

  // Get student by ID (you'll need to add this endpoint)
  getStudentById: async (id: string) => {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },

  // Delete student (you'll need to add this endpoint)
  deleteStudent: async (id: string) => {
    const response = await api.delete(`/students/${id}`);
    return response.data;
  },

  // Chatbot endpoint - connects to your /chatbot/ endpoint
  sendChatMessage: async (text: string) => {
    const response = await api.post('/chatbot/', { text });
    return response.data;
  },
};

export default api;