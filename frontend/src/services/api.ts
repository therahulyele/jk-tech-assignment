import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getPosts = () => api.get('/posts');
export const getPost = (id: string) => api.get(`/posts/${id}`);
export const createPost = (data: { title: string; content: string }) => 
  api.post('/posts', data);
export const updatePost = (id: string, data: { title: string; content: string }) =>
  api.put(`/posts/${id}`, data);
export const deletePost = (id: string) => api.delete(`/posts/${id}`);