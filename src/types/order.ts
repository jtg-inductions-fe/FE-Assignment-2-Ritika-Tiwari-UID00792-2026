import { User } from '@types';

import { BillDetails, CartItem } from './cart';
import { Restaurant } from './restaurant';

/** Interface defining the configuration properties for the order data, including the order id, order status, created at (time of order), customer details, restaurant details and bill details.  */
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
];

// The types specify the values that can be assigned to order status. e.g. 'Pending' | 'Accepted' | 'Preparing' | 'Out for delivery' | 'Delivered' | 'Rejected'
export type OrderStatus = (typeof ORDER_STATUS)[number];
