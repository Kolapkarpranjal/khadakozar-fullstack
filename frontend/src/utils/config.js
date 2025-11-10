// API Configuration
// Uses environment variable if available, otherwise defaults based on environment
const getApiBaseUrl = () => {
  // If environment variable is set, use it
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Check if we're running on localhost (development)
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:5000';
  }
  
  // Default to Railway backend for production
  return 'https://khadakozar-fullstack-production.up.railway.app';
};

const API_BASE_URL = getApiBaseUrl();

export const API_URL = {
  BASE: API_BASE_URL,
  FORMS: `${API_BASE_URL}/api/forms/submit`,
  AUTH: `${API_BASE_URL}/api/auth`,
  ADMIN: `${API_BASE_URL}/api/admin`,
  MEMBERS: `${API_BASE_URL}/api/members`,
  GALLERY: `${API_BASE_URL}/api/gallery`,
  EVENTS: `${API_BASE_URL}/api/events`,
  COMMITTEES: `${API_BASE_URL}/api/committees`,
  COMMITTEE_MEMBERS: `${API_BASE_URL}/api/committee-members`
};

export default API_URL;






