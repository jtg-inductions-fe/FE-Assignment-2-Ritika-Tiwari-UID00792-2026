import { SignUpFormData } from 'components/SignUpForm/signUpForm.types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers } from '@services';
import { User } from '@types';

import { AuthState } from './auth.types';

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
        signup: (state, action: PayloadAction<SignUpFormData>) => {
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
            state.currentUser = null;
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
        },
    },

    /** Listeners for external async thunk lifecycle events (fetchUsers).
     * Manages status updates and state population during network request cycles.
     */
    extraReducers: (builder) => {
        builder
            // Set a loading indicator flag while the fetch request is actively processing in the background.
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'pending';
            })
            // On success, save the downloaded user  array data directly into the central redux state store.
            .addCase(
                fetchUsers.fulfilled,
                (state, action: PayloadAction<User[]>) => {
                    state.status = 'succeeded';
                    state.users = action.payload;
                },
            )
            // Switch the status state marker to failed if an error or rejection occurs during the network trip.
            .addCase(fetchUsers.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { login, signup, logout } = authSlice.actions;
export default authSlice.reducer;
