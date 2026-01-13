import axios from 'axios';

/* =========================
   AXIOS INSTANCE
   ========================= */
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

/* =========================
   AUTH API
   ========================= */
export const authAPI = {
  login: (email, password) => {
    return API.post('/auth/login', { email, password });
  },

  logout: () => {
    return API.post('/auth/logout');
  },

  checkAuth: () => {
    return API.get('/auth/check');
  }
};

/* =========================
   BLOG API
   ========================= */
export const blogAPI = {
  getAll: () => API.get('/blogs'),
  getById: (id) => API.get(`/blogs/${id}`),
  create: (data) => API.post('/blogs', data),
  update: (id, data) => API.put(`/blogs/${id}`, data),
  delete: (id) => API.delete(`/blogs/${id}`)
};

/* =========================
   CATEGORY API
   ========================= */
export const categoryAPI = {
  getAll: () => API.get('/categories'),
  create: (name) => API.post('/categories', { name }),
  delete: (id) => API.delete(`/categories/${id}`)
};

export default API;
