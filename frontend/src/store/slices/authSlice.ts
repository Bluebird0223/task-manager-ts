import { createSlice } from '@reduxjs/toolkit';
import type { IUser } from '../../types/models';


interface AuthState {
    currentUser: IUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const initialState: AuthState = {
    currentUser: null,
    isAuthenticated: false,
    isLoading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
            state.isAuthenticated = true;
        },
        loginFailure: (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
        },
        logout: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;