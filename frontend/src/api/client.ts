import axios from "axios";
import { store } from '../store/store';

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { 'Content-Type': 'application/json'},
});

apiClient.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default apiClient;