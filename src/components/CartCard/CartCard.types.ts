import { Dispatch, SetStateAction } from 'react';

import { CartItem } from '@types';
/** Interface defining the types of properties that can be passed to cart item card */
export interface CartItemProps {
    /** Store the cart item details of the cart. */
    item: CartItem;
    /** Stores the set quantity of items mapped by Card ID. */
    quantities?: Record<string, number>;
    /** Callback function to handle the set quantity of items. */
    setQuantities?: Dispatch<SetStateAction<Record<string, number>>>;
    /** Callback function to handle the add to cart functionality. */
    onAdd?: () => void;
    /** Callback function to handle the delete functionality. */
    onRemove?: () => void;
}
