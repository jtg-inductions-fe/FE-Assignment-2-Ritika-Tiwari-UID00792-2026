// Base configuration of the redux toolkit store to manage state of the components
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
