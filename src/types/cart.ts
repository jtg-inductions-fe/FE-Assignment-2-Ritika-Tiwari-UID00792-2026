import { DietaryCategory } from './menu';
import { Restaurant } from './restaurant';

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

export interface BillDetails {
    itemsSubtotal: number;
    deliveryFee?: number;
    grandTotal: number;
    itemsCount: number;
}

export interface Cart {
    cartId: string;
    restaurant: Restaurant | null;
    items: CartItem[];
    billDetails: BillDetails;
}
