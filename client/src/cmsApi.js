// CMS API for fetching editable content
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '';

export const cmsApi = {
  // Get all content (public)
  getContent: () => axios.get(`${API_BASE}/api/content`),
  
  // Get all content for admin (with auth)
  getAdminContent: (token) => axios.get(`${API_BASE}/api/admin/content`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  
  // Save single content item
  saveContent: (token, data) => axios.post(`${API_BASE}/api/admin/content`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  
  // Save multiple content items
  saveBulkContent: (token, items) => axios.post(`${API_BASE}/api/admin/content/bulk`, { items }, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  
  // Upload resume
  uploadResume: (token, file) => {
    const formData = new FormData();
    formData.append('resume', file);
    return axios.post(`${API_BASE}/api/admin/resume`, formData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  // Get resume URL
  getResume: () => axios.get(`${API_BASE}/api/resume`)
};