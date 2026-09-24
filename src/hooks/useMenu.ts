import { useCallback, useEffect, useMemo, useState } from 'react';

import { useAuth, useDebounce } from '@hooks';
import { fetchMenuItemsByRestaurantId } from '@services';
import {
    decrementStock,
    incrementStock,
    setMenuError,
    setMenuItems,
    setMenuLoading,
    useAppDispatch,
    useAppSelector,
} from '@store';

/** Custom hook to manage and provide Menu data. */
export const useMenu = (restaurantId: string | undefined) => {
    const { fetchCurrentUser } = useAuth();
    const registeredUser = fetchCurrentUser();
    const dispatch = useAppDispatch();

    //  Extract values directly from Redux state
    const { menuItems, menuLoading, menuError } = useAppSelector(
        (state) => state.menu,
    );

    // Local state for UI search terms and active filter categories.
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('');

    // Use the debouncing on the searchTerm to prevent multiple search request.
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    //  Fetch data only when restaurantId or dispatch changes
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
    }, [dispatch, restaurantId]);

    // Compute the filtered list dynamically.
    const filteredMenuItems = useMemo(() => {
        const menuList = menuItems;

        // Apply search and category filters on the resulting list
        return menuList.filter((item) => {
            const matchesSearch = item.name
                .toLowerCase()
                .includes(debouncedSearchTerm.toLowerCase().trim());

            const matchesCategory = activeCategory
                ? item.dietaryCategory === activeCategory
                : true;

            return matchesSearch && matchesCategory;
        });
    }, [menuItems, debouncedSearchTerm, activeCategory]);

    /** Callback hook to handle filter toggle (veg/non-veg).
     * @param category- take the category type (veg/non-veg).
     */
    const handleFilterToggle = useCallback((category: string) => {
        setActiveCategory((prev) => (prev === category ? '' : category));
    }, []);

    /** Function to handle restock a MenuItem in the redux store.
     *  @param id - id of the item
     *  @returns void
     */
    const handleIncrease = (id: string) => {
        dispatch(incrementStock(id));
    };

    /** Function to handle decrement the stock quantity of a menu item in the redux store.
     *  @param id - id of the item
     *  @returns void
     */
    const handleDecrease = (id: string) => {
        dispatch(decrementStock({ id }));
    };

    return {
        userRole: registeredUser?.role,
        menuLoading,
        menuError,
        searchTerm,
        setSearchTerm,
        activeCategory,
        handleFilterToggle,
        filteredMenuItems,
        handleIncrease,
        handleDecrease,
    };
};
