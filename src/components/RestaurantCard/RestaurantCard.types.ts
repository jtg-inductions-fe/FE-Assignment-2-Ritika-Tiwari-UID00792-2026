import { Restaurant } from '@types';
/** Interface defining the types of properties that can be passed to restaurant card */
export interface RestaurantProps {
    /** Store the detail of the restaurant. */
    restaurant: Restaurant;
    /** Stores the userRole to render the role based cards.  */
    userRole: string | undefined;
    /** Callback function to handle the edit modal. */
    onEditClick: () => void;
    /** Callback function to handle the delete functionality. */
    onDelete: () => void;
    /** variable states whether the restaurant open or not. */
    isRestaurantClosed: boolean;
}
