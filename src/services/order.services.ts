import camelcaseKeys from 'camelcase-keys';
import { Order } from 'types/';

/** Function to fetch the order data from the mock data.
 * @param RequestInit [options] - Standard fetch options containing the AbortSignal.
 * @return camelCaseData - returns order data, (keys are converted in camel case).
 */
export const fetchOrderData = async (options?: RequestInit) => {
    // Pass options (which includes the signal) into fetch
    const response = await fetch('/mock/orders.json', options);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = (await response.json()) as Order[];
    const camelCaseData = camelcaseKeys(data, {
        deep: true,
    });

    return camelCaseData;
};
