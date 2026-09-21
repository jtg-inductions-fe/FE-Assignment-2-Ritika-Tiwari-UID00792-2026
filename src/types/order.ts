import { User } from '@types';

import { BillDetails, CartItem } from './cart';
import { Restaurant } from './restaurant';

export interface Order {
    orderId: string;
    orderStatus: OrderStatus;
    createdAt: string;
    customerDetails: User;
    restaurantDetails: Restaurant;
    items: CartItem[];
    billDetails: BillDetails;
}
// Define the array as a read-only tuple using 'as const'
export const ORDER_STATUS = [
    'Pending',
    'Accepted',
    'Preparing',
    'Out for delivery',
    'Delivered',
    'Rejected',
] as const;

// This creates the type: 'Pending' | 'Accepted' | 'Preparing' | 'Out for delivery' | 'Delivered' | 'Rejected'
export type OrderStatus = (typeof ORDER_STATUS)[number];
