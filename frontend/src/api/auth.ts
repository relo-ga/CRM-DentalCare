import { apiClient } from './client'

export interface LoginData{
    email: string;
    password: string;
}

export interface AuthResponse{
    access_token: string;
    user: {
        id: string;
        nombre: string;
        email: string;
        rol: string;
    }
}

export const loginRequest = async (data: LoginData): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/auth/login', data);
    return res.data;
}

export const meRequest = async ():Promise<AuthResponse['user']> => {
    const res = await apiClient.get('/auth/me');
    return res.data;
}