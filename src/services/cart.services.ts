import camelcaseKeys from 'camelcase-keys';

import { Cart } from '@types';

/** Function to fetch the cart data form the mock data.
 * @return camelCaseData - returns cart data, (keys are converted in camel case).
 *
 */
export const fetchCartData = async () => {
    const response = await fetch('/mock/cart.json');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = (await response.json()) as Cart;
    const camelCaseData = camelcaseKeys(data, {
        deep: true,
    }) as Cart;

    return camelCaseData;
};
