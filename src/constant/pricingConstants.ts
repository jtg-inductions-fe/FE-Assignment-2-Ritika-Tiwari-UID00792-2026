import { BillDetails } from '@types';

export const DELIVERY_FEE = 20;
export const PERCENT_OF_COST = 0.01;
export const DEFAULT_BILL_DETAILS: BillDetails = {
    itemsSubtotal: 0,
    deliveryFee: 20,
    grandTotal: 0,
    itemsCount: 0,
};
