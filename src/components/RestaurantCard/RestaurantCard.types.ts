import { Restaurant } from '@types';

/** Interface defining the types of properties that can be passed to restaurant card */
export interface RestaurantProps {
    /** Store the detail of the restaurant. */
    data: Restaurant;
    /** Stores the userRole to render the role based cards.  */
    userRole: string | undefined;
    /** Callback function to handle the edit modal. */
    onEdit: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Callback function to handle the delete functionality. */
    onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Callback function to handle the click on the restaurant. */
    onClick: () => void;
    /** variable states whether the restaurant open or not. */
    isClosed: boolean;
}
