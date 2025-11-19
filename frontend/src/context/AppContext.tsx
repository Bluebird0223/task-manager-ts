import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { MOCK_INITIAL_TASKS, MOCK_INITIAL_USERS } from '../constants';
import type { AppAction, IAppState, ITask, IUser } from '../types/models';

interface AppContextType {
    state: IAppState;
    dispatch: React.Dispatch<AppAction>;
    currentUser?: IUser;
    isAdmin: boolean;
}

const initialAppState: IAppState = {
    tasks: MOCK_INITIAL_TASKS,
    users: MOCK_INITIAL_USERS,
    currentUserId: 'u1',
};

const appReducer = (state: IAppState, action: AppAction): IAppState => {
    switch (action.type) {
        case 'ADD_TASK': {
            const newTask: ITask = {
                ...action.payload,
                id: crypto.randomUUID(),
                createdAt: Date.now(),
            };
            const newState = [...state.tasks, newTask];
            newState.sort((a, b) => a.createdAt - b.createdAt);
            return { ...state, tasks: newState };
        }
        case 'UPDATE_TASK': {
            const { id, updates } = action.payload;
            const updatedTasks = state.tasks.map(task =>
                task.id === id ? { ...task, ...updates } : task
            );
            return { ...state, tasks: updatedTasks };
        }
        case 'DELETE_TASK':
            return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
        case 'SET_CURRENT_USER':
            return { ...state, currentUserId: action.payload };
        case 'ADD_USER': {
            const newUser: IUser = {
                ...action.payload,
                id: `u${Date.now()}`,
            };
            if (!newUser.name.trim()) return state;
            return { ...state, users: [...state.users, newUser] };
        }
        case 'UPDATE_USER': {
            const { id, updates } = action.payload;
            const updatedUsers = state.users.map(user =>
                user.id === id ? { ...user, ...updates } : user
            );
            return { ...state, users: updatedUsers };
        }
        case 'DELETE_USER': {
            const userIdToDelete = action.payload;
            if (userIdToDelete === state.currentUserId || userIdToDelete === 'u4') {
                console.error("Cannot delete current user or unassigned pool.");
                return state;
            }
            const remainingUsers = state.users.filter(user => user.id !== userIdToDelete);
            const tasksToUpdate = state.tasks.map(task =>
                task.assigneeId === userIdToDelete
                    ? { ...task, assigneeId: null }
                    : task
            );
            return { ...state, users: remainingUsers, tasks: tasksToUpdate };
        }
        default:
            return state;
    }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialAppState);

    const currentUser = state.users.find(u => u.id === state.currentUserId);
    const isAdmin = currentUser?.role === 'admin';

    const value = useMemo(() => ({
        state, dispatch, currentUser, isAdmin
    }), [state, dispatch, currentUser, isAdmin]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};