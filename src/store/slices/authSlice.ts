import { SignupFormData } from 'pages/SignUp/SignUp.types';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from './auth.types';
import { User } from '@types';

/**
 * Initialize the authentication state from localStorage
 * Only the login status is persisted so that the user remains logged in after the browser refresh.
 */
const initialState: AuthState = {
    users: [] as User[],
    currentUser: null,
    status: 'idle',
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
};

export const fetchUsers = createAsyncThunk('auth/fetchUsers', async () => {
    const response = await fetch('/mock/users.json');
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    const data: User[] = (await response.json()) as User[];
    return data;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /**
         * Stores the authenticated user's information in Redux and marks the user as logged in.
         */
        login: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
        },
        /**
         * Stores the newly registered user's information in Redux and marks the user as logged in.
         */
        signup: (state, action: PayloadAction<SignupFormData>) => {
            state.currentUser = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
        },
        /**
         * Clears the authenticated user's information from the Redux and marks the user as logged out.
         */
        logout: (state) => {
            state.isLoggedIn = false;
            localStorage.removeItem('isLoggedIn');
        },
    },

    // Add extraReducers here to handle the async thunk lifecycle
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(
                fetchUsers.fulfilled,
                (state, action: PayloadAction<User[]>) => {
                    state.status = 'succeeded';
                    state.users = action.payload;
                },
            )
            .addCase(fetchUsers.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { login, signup, logout } = authSlice.actions;
export default authSlice.reducer;
