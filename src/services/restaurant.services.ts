import camelcaseKeys from 'camelcase-keys';

import { Restaurant } from '@types';

/** Function to fetch the restaurant data form the mock data.
 * @param RequestInit [options] - Standard fetch options containing the AbortSignal.
 * @return camelCaseData - returns restaurant data.
 */
export const fetchRestaurantData = async (options?: RequestInit) => {
    const response = await fetch('/mock/restaurants.json', options);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = (await response.json()) as Restaurant[];
    const camelCaseData = camelcaseKeys(data, {
        deep: true,
    }) as Restaurant[];

    return camelCaseData;
};
