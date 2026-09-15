import camelcaseKeys from 'camelcase-keys';

import { Menu } from '@types';

export const fetchMenuItemsByRestaurantId = async (restaurantId: string) => {
    const response = await fetch('/mock/menuItems.json');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = (await response.json()) as Menu[];
    const camelCaseData = camelcaseKeys(data, {
        deep: true,
    }) as Menu[];
    const filteredData = camelCaseData.filter(
        (item) => item.restaurantId === restaurantId,
    );
    return filteredData;
};
