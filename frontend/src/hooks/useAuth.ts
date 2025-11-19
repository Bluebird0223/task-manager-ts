import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { loginStart, loginSuccess, loginFailure, logout } from '../store/slices/authSlice';
import { authApi } from '../api/auth';
import type { LoginRequest, RegisterRequest } from '../api/auth';



export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { currentUser, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

    const isAdmin = currentUser?.role === 'admin';

    const login = useCallback(async (email: string, password: string): Promise<boolean> => {
        dispatch(loginStart());

        try {
            const loginData: LoginRequest = { email, password }
            const response = await authApi.login(loginData)

            if (response?.status && response.user) {
                const userData = {
                    _id: response.user._id,
                    name: response.user.name?.toLowerCase().replace(/\s+/g, '') || email.split('@')[0],
                    email: response.user.email,
                    teams: response.user.teams,
                    role: response.user.role
                };
                dispatch(loginSuccess(userData))
                return true
            } else {
                dispatch(loginFailure())
                return false
            }
        } catch (error: any) {
            console.error('Login failed:', error);
            dispatch(loginFailure());
            return false;
        }
    }, [dispatch]);

    const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
        dispatch(loginStart())
        try {
            const registerData: RegisterRequest = { name, email, password }
            const response = await authApi.register(registerData)
            if (response?.status && response?.user) {
                const userData = {
                    _id: response.user._id,
                    name: response.user.name?.toLowerCase().replace(/\s+/g, '') || email.split('@')[0],
                    email: response.user.email,
                    teams: response.user.teams,
                    role: response.user.role
                }
                dispatch(loginSuccess(userData))
                return true
            } else {
                dispatch(loginFailure())
                return false
            }
        } catch (error) {
            console.error('registration failed:', error);
            dispatch(loginFailure());
            return false;
        }
    }, [dispatch])

    const handleLogout = useCallback(async () => {
        try {
            await authApi.logout()
        } catch (error) {
            console.error('Logout API call failed:', error);
        } finally {
            dispatch(logout())
        }
    }, [dispatch]);

    const checkAuth = useCallback(async (): Promise<boolean> => {
        const token = localStorage.getItem('accessToken')
        dispatch(loginStart());
        if (!token) { return false }
        try {
            const response = await authApi.getCurrentUser()
            dispatch(loginSuccess(response?.user))
            return true
        } catch (error) {
            console.error('Auth check failed:', error);
            dispatch(logout());
            return false;
        }
    }, [dispatch])

    return {
        currentUser,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout: handleLogout,
        checkAuth,
        isAdmin
    };
};