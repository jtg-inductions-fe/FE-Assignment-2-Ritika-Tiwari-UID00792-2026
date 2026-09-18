import { useCallback, useEffect, useMemo } from 'react';

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
import { CartItem } from '@types';

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
     * Checks if the user is trying to order from the same restaurant or a new one.
     * Useful for showing a conflict warning if they switch restaurants.
     *
     * @param  restaurantId - The Id of the restaurant to check against.
     * @returns True if the cart is empty or belongs to the same restaurant; otherwise false.
     */
    const checkCurrentActiveRestaurant = useCallback(
        (restaurantId: string | undefined) => {
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
        },
        [restaurant?.restaurantId],
    );

    /**
     * Total number of unique types of items currently in the cart.
     */
    const cartCount = useMemo(() => items.length, [items]);

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
        checkCurrentActiveRestaurant,
    };
};
