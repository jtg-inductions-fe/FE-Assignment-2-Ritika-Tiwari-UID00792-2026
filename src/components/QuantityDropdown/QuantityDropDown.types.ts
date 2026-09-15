/** Interface defining the properties for the quantity dropdown. */
export interface QuantityDropdownProps {
    /** Stores the set quantity of items. */
    quantity: number;
    /** Callback function to handle the set quantity of items. */
    setQuantity: (quantity: number) => void;
    /** Stores the available items in stock. */
    maxQuantity: number;
}
