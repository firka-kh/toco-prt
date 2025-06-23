import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Job, Resume, User } from '@/types';

interface AppState {
    user: User | null;
    savedJobs: string[];
    appliedJobs: string[];
    notifications: Notification[];
    isLoading: boolean;
}

interface Notification {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    timestamp: Date;
}

type AppAction =
    | { type: 'SET_USER'; payload: User | null }
    | { type: 'SAVE_JOB'; payload: string }
    | { type: 'UNSAVE_JOB'; payload: string }
    | { type: 'APPLY_TO_JOB'; payload: string }
    | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp'> }
    | { type: 'REMOVE_NOTIFICATION'; payload: string }
    | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
    user: null,
    savedJobs: JSON.parse(localStorage.getItem('savedJobs') || '[]'),
    appliedJobs: JSON.parse(localStorage.getItem('appliedJobs') || '[]'),
    notifications: [],
    isLoading: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };

        case 'SAVE_JOB':
            const updatedSavedJobs = [...state.savedJobs, action.payload];
            localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
            return {
                ...state,
                savedJobs: updatedSavedJobs,
            };

        case 'UNSAVE_JOB':
            const filteredSavedJobs = state.savedJobs.filter(id => id !== action.payload);
            localStorage.setItem('savedJobs', JSON.stringify(filteredSavedJobs));
            return {
                ...state,
                savedJobs: filteredSavedJobs,
            };

        case 'APPLY_TO_JOB':
            const updatedAppliedJobs = [...state.appliedJobs, action.payload];
            localStorage.setItem('appliedJobs', JSON.stringify(updatedAppliedJobs));
            return {
                ...state,
                appliedJobs: updatedAppliedJobs,
            };

        case 'ADD_NOTIFICATION':
            const newNotification: Notification = {
                id: Date.now().toString(),
                timestamp: new Date(),
                ...action.payload,
            };
            return {
                ...state,
                notifications: [...state.notifications, newNotification],
            };

        case 'REMOVE_NOTIFICATION':
            return {
                ...state,
                notifications: state.notifications.filter(n => n.id !== action.payload),
            };

        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };

        default:
            return state;
    }
};

interface AppContextType {
    state: AppState;
    saveJob: (jobId: string) => void;
    unsaveJob: (jobId: string) => void;
    applyToJob: (jobId: string) => void;
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
    removeNotification: (id: string) => void;
    setLoading: (loading: boolean) => void;
    isJobSaved: (jobId: string) => boolean;
    isJobApplied: (jobId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const saveJob = (jobId: string) => {
        if (!state.savedJobs.includes(jobId)) {
            dispatch({ type: 'SAVE_JOB', payload: jobId });
            addNotification({
                type: 'success',
                message: 'Вакансия добавлена в избранное',
            });
        }
    };

    const unsaveJob = (jobId: string) => {
        dispatch({ type: 'UNSAVE_JOB', payload: jobId });
        addNotification({
            type: 'info',
            message: 'Вакансия удалена из избранного',
        });
    };

    const applyToJob = (jobId: string) => {
        if (!state.appliedJobs.includes(jobId)) {
            dispatch({ type: 'APPLY_TO_JOB', payload: jobId });
            addNotification({
                type: 'success',
                message: 'Отклик на вакансию отправлен',
            });
        }
    };

    const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
        dispatch({ type: 'ADD_NOTIFICATION', payload: notification });

        // Auto-remove notification after 5 seconds
        setTimeout(() => {
            dispatch({ type: 'REMOVE_NOTIFICATION', payload: Date.now().toString() });
        }, 5000);
    };

    const removeNotification = (id: string) => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
    };

    const setLoading = (loading: boolean) => {
        dispatch({ type: 'SET_LOADING', payload: loading });
    };

    const isJobSaved = (jobId: string) => {
        return state.savedJobs.includes(jobId);
    };

    const isJobApplied = (jobId: string) => {
        return state.appliedJobs.includes(jobId);
    };

    return (
        <AppContext.Provider
            value={{
                state,
                saveJob,
                unsaveJob,
                applyToJob,
                addNotification,
                removeNotification,
                setLoading,
                isJobSaved,
                isJobApplied,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
