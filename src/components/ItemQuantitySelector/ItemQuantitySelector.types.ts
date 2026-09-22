import { Dispatch, SetStateAction } from 'react';

/** Interface defining the properties for the quantity dropdown. */
export interface ItemQuantitySelectorProps {
    /** Stores the item id to uniquely identify the items to update the quantity. */
    itemId: string;
    /** Stores the set quantity of items. */
    quantity: number;
    /** Callback function to handle the set quantity of items. */
    setQuantities: Dispatch<SetStateAction<Record<string, number>>>;
    /** Stores the available items in stock. */
    maxQuantity: number;
    /** Callback function to increase quantity of items. */
    onIncrease: () => void;
    /** Callback function to decrease quantity of items. */
    onDecrease: () => void;
}
