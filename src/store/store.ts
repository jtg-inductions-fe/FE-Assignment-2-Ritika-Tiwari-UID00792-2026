// Base configuration of the redux toolkit store to manage state of the components
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth/authSlice';
import cartReducer from './slices/cart/cartSlice';
import menuReducer from './slices/menu/menuSlice';
import orderReducer from './slices/Order/orderSlice';
import restaurantReducer from './slices/restaurant/restaurantSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        restaurant: restaurantReducer,
        menu: menuReducer,
        cart: cartReducer,
        order: orderReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
