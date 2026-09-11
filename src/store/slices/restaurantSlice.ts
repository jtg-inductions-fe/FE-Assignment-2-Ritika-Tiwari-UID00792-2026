import { Restaurant } from 'pages/Restaurant/Restaurant.types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RestaurantState {
    restaurants: Restaurant[];
    filteredRestaurants: Restaurant[];
    loading: boolean;
    error: string | null;
}

const initialState: RestaurantState = {
    restaurants: [],
    filteredRestaurants: [],
    loading: false,
    error: null,
};

const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
            state.restaurants = action.payload;
            state.filteredRestaurants = action.payload;
        },
        setFilteredRestaurantsView: (
            state,
            action: PayloadAction<Restaurant[]>,
        ) => {
            state.filteredRestaurants = action.payload;
        },
        addRestaurant: (state, action: PayloadAction<Restaurant>) => {
            state.restaurants.push(action.payload);
            state.filteredRestaurants.push(action.payload);
        },
        editRestaurant: (state, action: PayloadAction<Restaurant>) => {
            const index = state.restaurants.findIndex(
                (r) => r.restaurantId === action.payload.restaurantId,
            );
            if (index !== -1) {
                state.restaurants[index] = action.payload;
            }
            const filteredIndex = state.filteredRestaurants.findIndex(
                (r) => r.restaurantId === action.payload.restaurantId,
            );
            if (filteredIndex !== -1) {
                state.filteredRestaurants[filteredIndex] = action.payload;
            }
        },

        deleteRestaurant: (state, action: PayloadAction<string>) => {
            const idToDelete = action.payload;
            state.restaurants = state.restaurants.filter(
                (r) => r.restaurantId !== idToDelete,
            );
            state.filteredRestaurants = state.filteredRestaurants.filter(
                (r) => r.restaurantId !== idToDelete,
            );
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const {
    setRestaurants,
    addRestaurant,
    deleteRestaurant,
    editRestaurant,
    setFilteredRestaurantsView,
    setLoading,
    setError,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
