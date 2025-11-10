// API Configuration
// Uses environment variable if available, otherwise defaults to localhost for development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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






