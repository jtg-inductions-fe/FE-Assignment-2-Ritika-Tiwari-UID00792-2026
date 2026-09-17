import { useEffect } from 'react';

import { fetchCartData } from '@services';
import { addItemToCart, useAppDispatch, useAppSelector } from '@store';
import {
    clearCart,
    deleteCompletely,
    removeItemFromCart,
    setCart,
    setCartError,
    setCartLoading,
} from '@store';
import { CartItem } from '@types';

export const useCart = () => {
    const dispatch = useAppDispatch();

    const { items, billDetails, cartId, restaurant, cartLoading, cartError } =
        useAppSelector((state) => state.cart);

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setCartLoading(true));
                dispatch(setCartError(null));
                const cartData = await fetchCartData();
                dispatch(setCart(cartData));
            } catch (err) {
                dispatch(
                    setCartError(
                        err instanceof Error
                            ? err.message
                            : 'An error occurred',
                    ),
                );
            } finally {
                dispatch(setCartLoading(false));
            }
        };
        void fetchData();
    }, [dispatch]);

    /** Function to handle add to cart a menu item and decrement the stock quantity.
     * @param id - id of the item
     * @param quantity - selected quantity of the item.
     * @returns void
     */
    const handleAddToCart = (item: CartItem) => {
        if (item) {
            if (item.stock <= 0) return;
            dispatch(
                addItemToCart({
                    item: {
                        itemId: item.itemId,
                        name: item.name,
                        imageUrl: item.imageUrl,
                        price: item.price,
                        stock: item.stock,
                        type: item.type,
                        quantity: 0,
                        itemSubtotal: 0,
                    },
                }),
            );
        } else {
            return null;
        }
    };

    const handleRemoveFromCart = (itemId: string) => {
        dispatch(removeItemFromCart(itemId));
    };

    const handleRemoveItemCompletely = (itemId: string) => {
        dispatch(deleteCompletely(itemId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };
    const checkCurrentActiveRestaurant = (restaurantId: string | undefined) => {
        if (
            restaurant?.restaurantId === null ||
            restaurant?.restaurantId === undefined
        ) {
            return true;
        }
        if (restaurant?.restaurantId === restaurantId) {
            return true;
        }
        return false;
    };

    const cartCount = () => items.length;

    return {
        items,
        billDetails,
        cartLoading,
        cartError,
        cartId,
        restaurant,
        handleAddToCart,
        handleClearCart,
        handleRemoveFromCart,
        handleRemoveItemCompletely,
        checkCurrentActiveRestaurant,
        cartCount,
    };
};
