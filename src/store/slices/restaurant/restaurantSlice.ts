import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Restaurant } from '@types';

import { RestaurantState } from './restaurant.types';

/**
 * Initialize the restaurants state
 */
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
        /** Store the restaurants data in the redux store.*/
        setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
            state.restaurants = action.payload;
            state.filteredRestaurants = action.payload;
        },
        /** Stores the filtered restaurants data in the redux store. */
        setFilteredRestaurantsView: (
            state,
            action: PayloadAction<Restaurant[]>,
        ) => {
            state.filteredRestaurants = action.payload;
        },
        /** Add new restaurant data in the redux store. */
        addRestaurant: (state, action: PayloadAction<Restaurant>) => {
            state.restaurants.push(action.payload);
            state.filteredRestaurants.push(action.payload);
        },
        /** Edit the restaurant data in the redux store. */
        editRestaurant: (state, action: PayloadAction<Restaurant>) => {
            // find the restaurant index from the redux store and update the data of restaurant.
            const index = state.restaurants.findIndex(
                (r) => r.restaurantId === action.payload.restaurantId,
            );
            if (index !== -1) {
                state.restaurants[index] = action.payload;
            }
            //Update the filtered data as well after the restaurant data has edited.
            const filteredIndex = state.filteredRestaurants.findIndex(
                (r) => r.restaurantId === action.payload.restaurantId,
            );
            if (filteredIndex !== -1) {
                state.filteredRestaurants[filteredIndex] = action.payload;
            }
        },
        /** Delete the restaurant for the given restaurant id from the redux store. */
        deleteRestaurant: (state, action: PayloadAction<string>) => {
            const idToDelete = action.payload;
            state.restaurants = state.restaurants.filter(
                (r) => r.restaurantId !== idToDelete,
            );
            state.filteredRestaurants = state.filteredRestaurants.filter(
                (r) => r.restaurantId !== idToDelete,
            );
        },
        /** Sets the loading state. */
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        /** Sets the error state. */
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
