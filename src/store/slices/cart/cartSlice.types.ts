import { BillDetails, CartItem, Restaurant } from '@types';

export interface CartState {
    cartId: string | null;
    restaurant: Restaurant | null;
    items: CartItem[];
    billDetails: BillDetails;
    /** Stores loading state for restaurants list */
    cartLoading: boolean;
    /** Stores error state for restaurants list */
    cartError: string | null;
}
