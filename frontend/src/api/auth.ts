import { apiClient } from './client';
import type { IMe, IUser } from '../types/models';

// Request types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    role?: string;
}

export interface AuthResponse {
    user: IUser;
    status: boolean;
    token: string
}


export const authApi = {
    async login(credentials: LoginRequest): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('accessToken', response.data.token);
        }

        return response.data;
    },

    async register(userData: RegisterRequest): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/auth/register', userData);
        if (response.data.token) {
            localStorage.setItem('accessToken', response.data.token);
        }

        return response.data;
    },

    async getUsers(): Promise<AuthResponse> {
        const token = localStorage.getItem('accessToken');
        const response = await apiClient.get<AuthResponse>('/auth/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },

    // Logout user
    async logout(): Promise<void> {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
            try {
                await apiClient.post('/auth/logout', { refreshToken });
            } catch (error) {
                console.error('Logout API call failed:', error);
            }
        }

        // Clear local storage regardless of API call success
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    },

    // Get current user profile
    async getCurrentUser(): Promise<IMe> {
        const response = await apiClient.get<IMe>('/auth/me');
        return response.data;
    },

    // Verify email
    async verifyEmail(token: string): Promise<{ message: string }> {
        const response = await apiClient.post<{ message: string }>('/auth/verify-email', { token });
        return response.data;
    },

    // Forgot password
    async forgotPassword(email: string): Promise<{ message: string }> {
        const response = await apiClient.post<{ message: string }>('/auth/forgot-password', { email });
        return response.data;
    },

    // Reset password
    async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
        const response = await apiClient.post<{ message: string }>('/auth/reset-password', {
            token,
            newPassword,
        });
        return response.data;
    },
};