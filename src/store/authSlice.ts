import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from 'pages/Auth/Auth.types';

/**
 * Initialize the authentication state from localStorage
 * Only the login status is persisted so that the user remains logged in after the browser refresh.
 */
const initialState: AuthState = {
    user: null,
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
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        /**
         * Stores the newly registered user's information in Redux and marks the user as logged in.
         */
        signup: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        /**
         * Clears the authenticated user's information from the Redux and marks the user as logged out.
         */
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
    },
});
export const { login, signup, logout } = authSlice.actions;
export default authSlice.reducer
