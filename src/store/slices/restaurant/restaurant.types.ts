import { Restaurant } from '@types';
/** Represent the complete Restaurants state of the application */
export interface RestaurantState {
    /** Stores restaurants list */
    restaurants: Restaurant[];
    /** Stores filtered restaurants list */
    filteredRestaurants: Restaurant[];
    /** Stores loading state for restaurants list */
    loading: boolean;
    /** Stores error state for restaurants list */
    error: string | null;
}
