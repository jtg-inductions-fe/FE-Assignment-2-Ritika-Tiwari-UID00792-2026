import { CartItem } from '@types';
import camelcaseKeys from 'camelcase-keys';

/** Function to fetch the cart data from the mock data.
 * @param RequestInit [options] - Standard fetch options containing the AbortSignal.
 * @return camelCaseData - returns cart data, (keys are converted in camel case).
 */
export const fetchCartData = async (options?: RequestInit) => {
    // Pass options (which includes the signal) into fetch
    const response = await fetch('/mock/orders.json', options);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json() as CartItem;
    const camelCaseData = camelcaseKeys(data, {
        deep: true,
    });

    return camelCaseData;
};
