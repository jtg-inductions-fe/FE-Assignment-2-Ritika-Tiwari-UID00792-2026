import { useCallback, useEffect } from 'react';

import { fetchCartData } from '@services';
import {
    addItemToCart,
    clearCart,
    deleteCompletely,
    removeItemFromCart,
    setCart,
    setCartError,
    setCartLoading,
    useAppDispatch,
    useAppSelector,
} from '@store';
import { Cart, CartItem } from '@types';

/**
 * A custom React hook to manage all shopping cart operations and state.
 * It automatically fetches initial cart data on mount and provides functions
 * for adding, removing, and clearing items from the cart.
 *
 * @returns An object containing the cart state, loading/error states, and handler functions.
 */
export const useCart = () => {
    const dispatch = useAppDispatch();

    // Extract cart state from the global Redux store
    const { items, billDetails, cartId, restaurant, cartLoading, cartError } =
        useAppSelector((state) => state.cart);

    /**
     * Automatically fetches the user's cart data from the server
     * when the component using this hook mounts.
     */
    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                dispatch(setCartLoading(true));
                dispatch(setCartError(null));

                const cartData = await fetchCartData({
                    signal: controller.signal,
                });
                dispatch(setCart(cartData));
            } catch (err) {
                if (err instanceof Error && err.name === 'AbortError') return;

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

        return () => {
            controller.abort();
        };
    }, [dispatch]);

    /**
     * Adds an item to the shopping cart if it is in stock.
     * @param {CartItem} item -Item to be added to the cart.
     */
    const handleAddToCart = useCallback(
        (item: CartItem) => {
            if (!item) return;
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
        },
        [dispatch],
    );

    /**
     * Decrements the quantity of a specific item in the cart by 1.
     *
     * @param  itemId - The unique id of the item to decrement.
     */
    const handleRemoveFromCart = useCallback(
        (itemId: string) => {
            dispatch(removeItemFromCart(itemId));
        },
        [dispatch],
    );

    /**
     * Removes an item completely from the cart.
     *
     * @param itemId - The unique id of the item to delete.
     */
    const handleRemoveItemCompletely = useCallback(
        (itemId: string) => {
            dispatch(deleteCompletely(itemId));
        },
        [dispatch],
    );

    /**
     * Removes all items from the shopping cart and resets cart state.
     */
    const handleClearCart = useCallback(() => {
        dispatch(clearCart());
    }, [dispatch]);

    /**
     *
     * Checks the status of the current active restaurant against a new restaurant ID.
     *
     * @param  restaurantId - The ID of the restaurant to check against.
     * @returns 'EMPTY' if no active restaurant exists,
     *          'MATCH' if it's the same restaurant,
     *          'CONFLICT' if it's a different restaurant.
     */
    const checkCurrentActiveRestaurant = useCallback(
        (restaurantId: string | undefined) => {
            const currentRestaurantId = restaurant?.restaurantId;

            // 1. Check if the cart/restaurant state is empty
            if (
                currentRestaurantId === null ||
                currentRestaurantId === undefined
            ) {
                return 'EMPTY';
            }

            // 2. Check if the restaurants match
            if (currentRestaurantId === restaurantId) {
                return 'MATCH';
            }

            // 3. Otherwise, there is a conflict
            return 'CONFLICT';
        },
        [restaurant?.restaurantId],
    );

    /**
     * Handle the functionality to add new cart.
     * @param newCartData - Take the new cart data.
     */
    const handleNewCart = useCallback(
        (newCartData: Cart) => {
            try {
                dispatch(setCartLoading(true));
                dispatch(setCartError(null));
                dispatch(setCart(newCartData));
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
        },
        [dispatch],
    );

    /**
     * Total number of unique types of items currently in the cart.
     */
    const cartCount = billDetails.itemsCount;

    return {
        items,
        billDetails,
        cartLoading,
        cartError,
        cartId,
        restaurant,
        cartCount,
        handleAddToCart,
        handleClearCart,
        handleRemoveFromCart,
        handleRemoveItemCompletely,
        handleNewCart,
        checkCurrentActiveRestaurant,
    };
};
