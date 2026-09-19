import { useCallback, useEffect, useMemo, useState } from 'react';

import { useAuth, useDebounce } from '@hooks';
import { fetchRestaurantData } from '@services';
import {
    addRestaurant,
    deleteRestaurant,
    editRestaurant,
    setError,
    setLoading,
    setRestaurants,
    useAppDispatch,
    useAppSelector,
} from '@store';
import { Restaurant } from '@types';

/**Custom hook to manage and provide restaurant data. */
export const useRestaurant = () => {
    const dispatch = useAppDispatch();

    // Extract values from Redux state (removed filteredRestaurants)
    const { restaurants, loading, error } = useAppSelector(
        (state) => state.restaurant,
    );
    const { fetchCurrentUser } = useAuth();
    const registeredUser = fetchCurrentUser();

    // Local state for UI search terms and active filter categories.
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('');

    // Use the debouncing on the searchTerm to prevent multiple search request.
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    // Fetch data from mock json on mount and convert the variables to camel case.
    useEffect(() => {
        // Flag to track if the component is still mounted/valid.
        let isCurrent = true;
        const fetchData = async () => {
            try {
                dispatch(setLoading(true));
                dispatch(setError(null));

                let restaurantData = await fetchRestaurantData();

                // Filter based on user role
                if (registeredUser?.role === 'owner') {
                    restaurantData = restaurantData.filter(
                        (restaurant: Restaurant) =>
                            restaurant.ownerId === registeredUser.id,
                    );
                }
                if (isCurrent) {
                    dispatch(setRestaurants(restaurantData));
                }
            } catch (err) {
                if (isCurrent) {
                    dispatch(
                        setError(
                            err instanceof Error
                                ? err.message
                                : 'An error occurred',
                        ),
                    );
                }
            } finally {
                if (isCurrent) {
                    dispatch(setLoading(false));
                }
            }
        };

        void fetchData();

        // Return the cleanup function to invalidate the request if dependency changes.
        return () => {
            isCurrent = false;
        };
    }, [dispatch, registeredUser?.id, registeredUser?.role]);

    // Compute the filtered list dynamically on the client side
    const filteredRestaurants = useMemo(
        () =>
            restaurants.filter((restaurant) => {
                const matchesSearch = restaurant.name
                    .toLowerCase()
                    .includes(debouncedSearchTerm.toLowerCase().trim());

                const matchesCategory = activeCategory
                    ? restaurant.type === activeCategory
                    : true;

                return matchesSearch && matchesCategory;
            }),
        [restaurants, debouncedSearchTerm, activeCategory],
    );

    /** Callback hook to handle filter toggle (veg/non-veg).
     * @param category- take the category type (veg/non-veg).
     */
    const handleFilterToggle = useCallback((category: string) => {
        setActiveCategory((prev) => (prev === category ? '' : category));
    }, []);

    /** Function to handle add new restaurant in the redux store.
     * @param data- takes the restaurant data.
     */
    const handleAddRestaurant = useCallback(
        (data: Restaurant) => {
            if (data) {
                dispatch(addRestaurant(data));
            }
        },
        [dispatch],
    );

    /** Function to handle edit existing restaurant in the redux store.
     * @param data- takes the restaurant data.
     */
    const handleEditRestaurant = useCallback(
        (data: Restaurant) => {
            if (data) {
                dispatch(editRestaurant(data));
            }
        },
        [dispatch],
    );

    /** Function to handle delete restaurant in the redux store.
     * @param restaurantId- takes the restaurant id to delete the restaurant.
     */
    const handleDeleteRestaurant = useCallback(
        (restaurantId: string) => {
            if (restaurantId) {
                dispatch(deleteRestaurant(restaurantId));
            }
        },
        [dispatch],
    );

    /** Function to check whether restaurant is closed or not based on the closing time.
     * @param openingTime - opening time of restaurant in 24h format (e.g., '09:00', '17:00')
     * @param closingTime - closing time of restaurant in 24h format (e.g., '22:00', '02:00')
     * @returns true if closed, false if open
     */
    const isRestaurantClosed = useCallback(
        (openingTime: string, closingTime: string): boolean => {
            //  Get current time in Asia/Kolkata forcing 24-hour parsing
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                hourCycle: 'h23',
            });

            const [currHourStr, currMinStr] = formatter
                .format(new Date())
                .split(':');
            const currentMinutes =
                parseInt(currHourStr, 10) * 60 + parseInt(currMinStr, 10);

            //   helper function for 24-hour "HH:MM" strings
            const parseTimeToMinutes = (timeStr: string): number => {
                const [hourStr, minuteStr] = timeStr.trim().split(':');
                return parseInt(hourStr, 10) * 60 + parseInt(minuteStr, 10);
            };

            const openMinutes = parseTimeToMinutes(openingTime);
            const closeMinutes = parseTimeToMinutes(closingTime);

            //  Handle 24-hour service edge case (e.g., '00:00' to '00:00' or '17:00' to '17:00')
            if (openMinutes === closeMinutes) {
                return false;
            }

            //  Determine if the restaurant is open
            let isOpen = false;
            if (closeMinutes > openMinutes) {
                isOpen =
                    currentMinutes >= openMinutes &&
                    currentMinutes < closeMinutes;
            } else {
                isOpen =
                    currentMinutes >= openMinutes ||
                    currentMinutes < closeMinutes;
            }

            return !isOpen;
        },
        [],
    );

    return {
        filteredRestaurants,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        activeCategory,
        handleFilterToggle,
        userRole: registeredUser?.role,
        ownerId: registeredUser?.id,
        handleAddRestaurant,
        handleEditRestaurant,
        handleDeleteRestaurant,
        isRestaurantClosed,
    };
};
