import { BillDetails, CartItem, Restaurant } from '@types';

export interface CartState {
    cartId: string | null;
    restaurant: Restaurant | null;
    items: CartItem[];
    billDetails: BillDetails;
    /** Stores loading state for restaurants list */
    loading: boolean;
    /** Stores error state for restaurants list */
    error: string | null;
}
