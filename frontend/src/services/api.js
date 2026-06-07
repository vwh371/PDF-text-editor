import axios from 'axios';

// Backend API base URL - change if backend runs on different port/host
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Axios instance with default configuration
 * Includes base URL, headers, and timeout
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000, // 30 second timeout for large PDFs
});

/**
 * Request interceptor for logging
 * Logs all API requests to console for debugging
 */
api.interceptors.request.use(request => {
  console.log('🚀 API Request:', request.method.toUpperCase(), request.url);
  return request;
});

/**
 * Response interceptor for error handling
 * Logs errors and formats error messages
 */
api.interceptors.response.use(
  response => response,
  error => {
    console.error('❌ API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * PDF API Service
 * Contains all endpoints for PDF operations
 */
export const pdfApi = {
  /**
   * Upload PDF file to backend
   * @param {File} file - PDF file object
   * @returns {Promise} - Session data with text blocks
   */
  uploadPDF: async (file) => {
    const formData = new FormData();
    formData.append('pdf', file);
    const response = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  /**
   * Get raw PDF data for rendering
   * @param {string} sessionId - Session identifier
   * @returns {Promise<Blob>} - PDF blob data
   */
  getPDFData: async (sessionId) => {
    const response = await api.get(`/download/pdf-data/${sessionId}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  /**
   * Get current text blocks for a session
   * @param {string} sessionId - Session identifier
   * @returns {Promise} - Text blocks data
   */
  getTextBlocks: async (sessionId) => {
    const response = await api.get(`/edit/text-blocks/${sessionId}`);
    return response.data;
  },

  /**
   * Update text blocks in session
   * @param {string} sessionId - Session identifier
   * @param {Array} textBlocks - Updated text blocks array
   * @param {Object} editHistory - Optional edit history record
   * @returns {Promise} - Update response
   */
  updateBlocks: async (sessionId, textBlocks, editHistory = null) => {
    const response = await api.post(`/edit/update-blocks/${sessionId}`, {
      textBlocks,
      editHistory,
    });
    return response.data;
  },

  /**
   * Generate and download edited PDF
   * @param {string} sessionId - Session identifier
   * @param {Array} textBlocks - Current text blocks with edits
   * @returns {Promise<Blob>} - Edited PDF blob
   */
  generateAndDownloadPDF: async (sessionId, textBlocks) => {
    const response = await api.post(`/download/generate/${sessionId}`, {
      textBlocks,
    }, { responseType: 'blob' });
    return response.data;
  },

  /**
   * Reset PDF to original state
   * @param {string} sessionId - Session identifier
   * @returns {Promise} - Reset response with original text blocks
   */
  resetPDF: async (sessionId) => {
    const response = await api.post(`/edit/reset/${sessionId}`);
    return response.data;
  },
};

export default pdfApi;