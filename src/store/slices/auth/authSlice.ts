import { SignUpFormData } from 'components/SignUpForm/SignUpForm.types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@types';

import { AuthState } from './auth.types';

/**
 * Initialize the authentication state from localStorage
 * Only the login status is persisted so that the user remains logged in after the browser refresh.
 */
const initialState: AuthState = {
    users: [] as User[],
    currentUser: null,
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /** Store the restaurants data in the redux store.*/
        setRegisteredUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
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
});

export const { setRegisteredUsers, login, signup, logout } = authSlice.actions;
export default authSlice.reducer;
