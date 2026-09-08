import { AuthState } from 'pages/Auth.types';
import { LoginFormData } from 'pages/Login/Login.types';
import { SignupFormData } from 'pages/SignUp/SignUp.types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
        login: (state, action: PayloadAction<LoginFormData>) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
        },
        /**
         * Stores the newly registered user's information in Redux and marks the user as logged in.
         */
        signup: (state, action: PayloadAction<SignupFormData>) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
        },
        /**
         * Clears the authenticated user's information from the Redux and marks the user as logged out.
         */
        logout: (state) => {
            state.isLoggedIn = false;
            localStorage.removeItem('isLoggedIn');
        },
    },
});
export const { login, signup, logout } = authSlice.actions;
export default authSlice.reducer;
