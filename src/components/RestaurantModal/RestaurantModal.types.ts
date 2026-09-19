import { Restaurant } from '@types';

/**
 * Interface defining the configuration properties of the Add and edit restaurant form.
 */
export interface RestaurantModalProps {
    /** Stores the open state of the modal. */
    open: boolean;
    /** Callback to handle close event of modal. */
    onClose: () => void;
    /** Stores the owner Id for the current restaurant. */
    ownerId: string;
    /** Stores the current restaurant data for the modal. */
    restaurantToEdit?: Restaurant | null;
    /** Callback function to handle add functionality like add restaurant and menu items. */
    onAdd: (data: Restaurant) => void;
    /** Callback function to handle edit functionality like edit restaurant and menu items. */
    onEdit: (data: Restaurant) => void;
}
