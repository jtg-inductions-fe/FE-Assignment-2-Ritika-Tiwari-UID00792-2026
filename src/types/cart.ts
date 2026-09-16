import { Restaurant } from './restaurant';

export interface CartItem {
    cartItemId: string;
    menuItemId: string;
    name: string;
    imageUrl: string;
    type: string;
    price: number;
    stock: number;
    quantity: number;
    itemSubtotal: number;
}

export interface BillDetails {
    itemsSubtotal: number;
    deliveryFee?: number;
    tax?: number;
    grandTotal: number;
    itemCount: number;
}

export interface Cart {
    cartId: string;
    restaurant: Restaurant;
    items: CartItem[];
    billDetails: BillDetails;
}
