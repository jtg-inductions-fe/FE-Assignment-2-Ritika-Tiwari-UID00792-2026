import { useEffect, useState } from 'react'; // 1. Added useEffect import

import camelcaseKeys from 'camelcase-keys';

import { useAuth } from '@hooks';
import { Menu } from '@types';

/** Custom hook to manage and provide Menu data. */
export const useMenu = () => {
    const { fetchUser } = useAuth();
    const registeredUser = fetchUser();
    const [menuItems, setMenuItem] = useState<Menu[]>([]);

    // Wrap the fetch logic inside useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/mock/menuItems.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = (await response.json()) as Menu[];

                const camelCaseData = camelcaseKeys(data, {
                    deep: true,
                }) as Menu[];
                setMenuItem(camelCaseData);
            } catch {
                // console.error("Failed to fetch menu items:", error);
            }
        };

        void fetchData();
    }, []); // Empty array ensures this only runs once on mount

    return {
        userRole: registeredUser?.role,
        menuItems,
    };
};
