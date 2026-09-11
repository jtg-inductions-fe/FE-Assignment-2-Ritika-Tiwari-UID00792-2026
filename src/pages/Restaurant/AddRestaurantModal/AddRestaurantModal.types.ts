import { Restaurant } from '../Restaurant.types';

export interface AddRestaurantModalProps {
    open: boolean;
    onClose: () => void;
    ownerId: string;
    restaurantToEdit?: Restaurant | null;
}
