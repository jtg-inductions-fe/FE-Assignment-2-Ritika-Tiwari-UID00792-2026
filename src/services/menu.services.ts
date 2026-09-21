import camelcaseKeys from 'camelcase-keys';

import { Menu } from '@types';

/** Function to fetch the menu data form the mock data.
 * @param restaurantId - takes the restaurant id to fetch the menu items that belongs only to the restaurant id of the restaurant.
 * @return filteredData - returns filtered menu item data.
 */
export const fetchMenuItemsByRestaurantId = async (restaurantId: string) => {
    const response = await fetch('/mock/menuItems.json');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = (await response.json()) as Menu[];
    const camelCaseData = camelcaseKeys(data, {
        deep: true,
    }) as Menu[];

    // Filter the items that belong to current restaurant id.
    const filteredData = camelCaseData.filter(
        (item) => item.restaurantId === restaurantId,
    );
    return filteredData;
};
