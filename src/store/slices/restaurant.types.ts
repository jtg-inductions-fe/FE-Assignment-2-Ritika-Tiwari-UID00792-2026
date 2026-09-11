import { Restaurant } from 'pages/Restaurant/Restaurant.types';

export interface RestaurantState {
    restaurants: Restaurant[];
    filteredRestaurants: Restaurant[];
    loading: boolean;
    error: string | null;
}
