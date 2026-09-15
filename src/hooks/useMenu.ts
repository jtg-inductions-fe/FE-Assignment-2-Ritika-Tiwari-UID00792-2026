import { useEffect } from 'react';

import { useAuth } from '@hooks';
import { fetchMenuItemsByRestaurantId } from '@services';
import {
    addMenuItems,
    decrementStock,
    deleteMenuItems,
    editMenuItems,
    incrementStock,
    setMenuError,
    setMenuItems,
    setMenuLoading,
    useAppDispatch,
    useAppSelector,
} from '@store';
import { Menu } from '@types';

/** Custom hook to manage and provide Menu data. */
export const useMenu = (restaurantId: string | undefined) => {
    const { fetchUser } = useAuth();
    const registeredUser = fetchUser();
    const dispatch = useAppDispatch();

    // 1. Extract values directly from Redux state
    const { menuItems, loading, error } = useAppSelector((state) => state.menu);

    // 2. Fetch data only when restaurantId or dispatch changes
    useEffect(() => {
        if (!restaurantId) return;

        const fetchData = async () => {
            try {
                dispatch(setMenuLoading(true));
                dispatch(setMenuError(null));
                const filteredData =
                    await fetchMenuItemsByRestaurantId(restaurantId);
                dispatch(setMenuItems(filteredData));
            } catch (err) {
                dispatch(
                    setMenuError(
                        err instanceof Error
                            ? err.message
                            : 'An error occurred',
                    ),
                );
            } finally {
                dispatch(setMenuLoading(false));
            }
        };

        void fetchData();
    }, [dispatch, restaurantId]); // Removed menuItems to prevent infinite loop

    /** Function to handle adding a new menuItem in the redux store. */
    const handleAddMenuItem = (data: Menu) => {
        if (data) dispatch(addMenuItems(data));
    };

    /** Function to handle editing an existing MenuItem in the redux store. */
    const handleEditMenuItem = (data: Menu) => {
        if (data) dispatch(editMenuItems(data));
    };

    /** Function to handle deleting a MenuItem in the redux store. */
    const handleDeleteMenuItem = (itemId: string) => {
        if (itemId) dispatch(deleteMenuItems(itemId));
    };
    /** Function to handle deleting a MenuItem in the redux store. */
    const handleAddToCart = (menu: Menu) => {
        if (menu.stock <= 0) return;

        dispatch(decrementStock(menu.itemId));
    };

    /** Function to handle restock a MenuItem in the redux store. */
    const handleIncreaseStock = (id: string) => {
        dispatch(incrementStock(id));
    };

    /** Function to handle restock a MenuItem in the redux store. */
    const handleDecreaseStock = (id: string) => {
        dispatch(decrementStock(id));
    };

    return {
        userRole: registeredUser?.role,
        loading,
        error,
        filteredMenuItems: menuItems,
        handleAddMenuItem,
        handleEditMenuItem,
        handleDeleteMenuItem,
        handleAddToCart,
        handleIncreaseStock,
        handleDecreaseStock,
    };
};
