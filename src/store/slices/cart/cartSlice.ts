import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem } from '@types';

import { CartState } from './cartSlice.types';

const initialState: CartState = {
    cartId: null,
    restaurant: null,
    items: [],
    billDetails: {
        itemsSubtotal: 0,
        deliveryFee: 40,
        grandTotal: 0,
        itemsCount: 0,
    },
    cartLoading: false,
    cartError: null,
};

const recalculateTotals = (state: CartState) => {
    let subTotal = 0;
    let totalCount = 0;
    state.items.forEach((item) => {
        item.itemSubtotal = item.quantity * item.price;
        subTotal += item.itemSubtotal;
        totalCount += item.quantity;
    });
    let deliveryFee = 0;
    if (subTotal > 0) {
        const onePercentOfCost = subTotal * 0.01;
        deliveryFee = Math.max(20, onePercentOfCost);
        deliveryFee = Math.round(deliveryFee * 100) / 100;

        state.billDetails.itemsSubtotal = subTotal;
        state.billDetails.itemsCount = totalCount;
        state.billDetails.deliveryFee = deliveryFee;

        state.billDetails.grandTotal =
            subTotal > 0 ? subTotal + deliveryFee : 0;
    }
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<Cart>) => {
            state.cartId = action.payload.cartId;
            state.restaurant = action.payload.restaurant;
            state.items = action.payload.items;
        },

        addItemToCart: (
            state,
            action: PayloadAction<{
                item: Omit<CartItem, 'quantity' | 'itemSubtotal'>;
                quantity: number;
            }>,
        ) => {
            const { item, quantity } = action.payload;

            const existingItem = state.items.find(
                (cartItem) => cartItem.menuItemId === item.menuItemId,
            );

            if (existingItem) {
                if (existingItem.quantity + quantity <= existingItem.stock) {
                    existingItem.quantity += quantity;
                    existingItem.itemSubtotal += quantity * existingItem.price;
                } else {
                    existingItem.quantity = existingItem.stock;
                }
            } else {
                state.items.push({
                    ...item,
                    quantity: quantity,
                    itemSubtotal: item.price * quantity,
                });
            }

            recalculateTotals(state);
        },
        removeItemFromCart: (state, action: PayloadAction<string>) => {
            const existingItem = state.items.find(
                (item) => item.menuItemId === action.payload,
            );
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.items = state.items.filter(
                        (item) => item.menuItemId != action.payload,
                    );
                }
            }
            recalculateTotals(state);
        },

        deleteCompletely: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.menuItemId !== action.payload,
            );
            recalculateTotals(state);
        },
        /** Sets the loading state. */
        setCartLoading: (state, action: PayloadAction<boolean>) => {
            state.cartLoading = action.payload;
        },
        /** Sets the error state. */
        setCartError: (state, action: PayloadAction<string | null>) => {
            state.cartError = action.payload;
        },

        clearCart: () => initialState,
    },
});

export const {
    setCart,
    addItemToCart,
    removeItemFromCart,
    deleteCompletely,
    setCartLoading,
    setCartError,
    clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
