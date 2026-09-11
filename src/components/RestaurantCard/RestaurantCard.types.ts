import { Restaurant } from 'pages/Restaurant/Restaurant.types';

export interface RestaurantProps {
    restaurant: Restaurant;
    userRole: string | undefined;
    onEditClick: () => void;
    onDelete: () => void;
}
