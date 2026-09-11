// Base configuration of the redux toolkit store to manage state of the components
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth/authSlice';
import restaurantReducer from './slices/restaurant/restaurantSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        restaurant: restaurantReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
