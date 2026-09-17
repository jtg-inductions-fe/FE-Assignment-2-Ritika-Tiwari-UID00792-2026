import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@types';

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
    loading: false,
    error: null,
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
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },
        addItemToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(
                (item) => item.menuItemId === action.payload.menuItemId,
            );
            if (existingItem) {
                if (existingItem.quantity < existingItem.stock) {
                    existingItem.quantity += 1;
                } else {
                    state.items.push({
                        ...action.payload,
                        quantity: 1,
                        itemSubtotal: action.payload.price,
                    });
                }
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
                        (item) => item.menuItemId != action.payload
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

        clearCart: () => initialState,
    },
});

export const { setCart, addItemToCart, removeItemFromCart, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
