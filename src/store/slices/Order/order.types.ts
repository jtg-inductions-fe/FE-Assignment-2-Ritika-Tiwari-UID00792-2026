import { BillDetails, CartItem, OrderStatus, Restaurant, User } from '@types';

export interface Order {
    orderId: string;
    orderStatus: OrderStatus;
    createdAt: string;
    restaurantDetails: Restaurant;
    customerDetails: User;
    items: CartItem[];
    billDetails: BillDetails;
}

export interface OrderState {
    orders: Order[];
    selectedOrder: Order | null;
    orderLoading: boolean;
    orderError: string | null;
}
