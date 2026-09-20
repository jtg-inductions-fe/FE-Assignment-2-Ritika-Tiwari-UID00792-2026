import { User } from '@types';

import { BillDetails, CartItem } from './cart';
import { Restaurant } from './restaurant';

export interface Order {
    orderId: string;
    orderStatus: string;
    createdAt: string;
    customerDetails: User;
    restaurantDetails: Restaurant;
    items: CartItem[];
    billDetails: BillDetails;
}
