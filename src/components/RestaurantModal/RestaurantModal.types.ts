import { Restaurant } from '@types';

/**
 * Interface defining the configuration properties of the Add and edit restaurant form.
 */
export interface RestaurantModalProps {
    open: boolean;
    onClose: () => void;
    ownerId: string;
    restaurantToEdit?: Restaurant | null;
}
