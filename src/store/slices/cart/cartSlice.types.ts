import { BillDetails, CartItem, Restaurant } from '@types';

/**
 * Represents the state structure for managing carts within a state management store.
 */
export interface CartState {
    /** Stores the cart id. */
    cartId: string | null;
    /** Stores the restaurant details. */
    restaurant: Restaurant | null;
    /** Stores the cart items. */
    items: CartItem[];
    /** Stores the bill details for the cart */
    billDetails: BillDetails;
    /** Flag to indicate if an asynchronous cart operation (fetching, creating, updating) is in progress. */
    cartLoading: boolean;
    /** Holds the error message if an cart operation fails, or null if there are no errors. */
    cartError: string | null;
}
