import { useCallback, useEffect, useMemo, useState } from 'react';

import { useAuth, useDebounce } from '@hooks';
import { fetchRestaurantData } from '@services';
import {
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
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Fetch data from mock json on mount and convert the variables to camel case.
    useEffect(() => {
        if (restaurants && restaurants.length > 0) return;
        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {
            try {
                dispatch(setLoading(true));
                dispatch(setError(null));

                // Pass the cancellation signal to fetch function
                const restaurantData = await fetchRestaurantData({ signal });

                dispatch(setRestaurants(restaurantData));
            } catch (err) {
                if (err instanceof Error && err.name === 'AbortError') {
                    return;
                }

                dispatch(
                    setError(
                        err instanceof Error
                            ? err.message
                            : 'An error occurred',
                    ),
                );
            } finally {
                // Only reset loading if the request wasn't cancelled mid-flight
                if (!signal.aborted) {
                    dispatch(setLoading(false));
                }
            }
        };

        void fetchData();

        // Return the cleanup function to abort the request if dependencies change or component unmounts.
        return () => {
            controller.abort();
        };
    }, [dispatch, registeredUser?.id, registeredUser?.role]);

    // Compute the filtered list dynamically.
    const filteredRestaurants = useMemo(() => {
        let restaurantList = restaurants;

        // Filter based on user role if they are an owner
        if (registeredUser?.role === 'owner') {
            restaurantList = restaurantList.filter(
                (restaurant: Restaurant) =>
                    restaurant.ownerId === registeredUser.id,
            );
        }
        // Apply search and category filters on the resulting list
        return restaurantList.filter((restaurant) => {
            const matchesSearch = restaurant.name
                .toLowerCase()
                .includes(debouncedSearchTerm.toLowerCase().trim());

            const matchesCategory = activeCategory
                ? restaurant.dietaryCategory === activeCategory
                : true;

            return matchesSearch && matchesCategory;
        });
    }, [restaurants, registeredUser, debouncedSearchTerm, activeCategory]);

    /** Callback hook to handle filter toggle (veg/non-veg).
     * @param category- take the category type (veg/non-veg).
     */
    const handleFilterToggle = useCallback((category: string) => {
        setActiveCategory((prev) => (prev === category ? '' : category));
    }, []);

    /** Function to check whether restaurant is closed or not based on the closing time.
     * @param openingTime - opening time of restaurant in 24h format (e.g., '09:00', '17:00')
     * @param closingTime - closing time of restaurant in 24h format (e.g., '22:00', '02:00')
     * @returns true if closed, false if open
     */
    const isRestaurantClosed = useCallback(
        (openingTime: string, closingTime: string): boolean => {
            // Get current time components directly in UTC
            const now = new Date();
            const currentMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();

            // Helper function to handle full UTC strings (e.g., "16:00:00Z" or "16:00")
            const parseTimeToMinutes = (timeStr: string): number => {
                // Remove 'Z' if present, then split by ':'
                const cleanStr = timeStr.replace('Z', '').trim();
                const [hourStr, minuteStr] = cleanStr.split(':');

                return parseInt(hourStr, 10) * 60 + parseInt(minuteStr, 10);
            };

            const openMinutes = parseTimeToMinutes(openingTime);
            const closeMinutes = parseTimeToMinutes(closingTime);

            // Handle 24-hour service edge case
            if (openMinutes === closeMinutes) {
                return false;
            }

            // Determine if the restaurant is open using standard overnight rolling logic
            let isOpen = false;
            if (closeMinutes > openMinutes) {
                isOpen =
                    currentMinutes >= openMinutes &&
                    currentMinutes < closeMinutes;
            } else {
                // Handles overnight operations (e.g., Open 16:00Z, Close 02:00Z)
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
        isRestaurantClosed,
    };
};
