import { DietaryCategory } from './menu';
import { Restaurant } from './restaurant';

/** Interface defining the configuration properties of cart items. */
export interface CartItem {
    itemId: string;
    name: string;
    imageUrl: string;
    dietaryCategory: DietaryCategory;
    price: number;
    stock: number;
    quantity: number;
    itemSubtotal: number;
}

/** Interface defining the configuration properties of the bill details. */
export interface BillDetails {
    itemsSubtotal: number;
    deliveryFee?: number;
    grandTotal: number;
    itemsCount: number;
}

/** Interface defining configuration properties for the cart data including cart id, cart items, restaurant data and bill details. */
export interface Cart {
    cartId: string;
    restaurant: Restaurant | null;
    items: CartItem[];
    billDetails: BillDetails;
}
