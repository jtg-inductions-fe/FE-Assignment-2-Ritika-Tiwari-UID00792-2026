import { BillDetails, CartItem, Restaurant } from '@types';

export interface CartState {
    /** Stores the cart id. */
    cartId: string | null;
    /** Stores the restaurant details. */
    restaurant: Restaurant | null;
    /** Stores the cart items. */
    items: CartItem[];
    /** Stores the bill details for the cart */
    billDetails: BillDetails;
    /** Stores loading state for restaurants list */
    cartLoading: boolean;
    /** Stores error state for restaurants list */
    cartError: string | null;
}
