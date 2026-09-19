import { BillDetails, CartItem, Restaurant } from '@types';
/** Interface defining the types of properties that can be passed to cart item card */
export interface CartItemProps {
    /** Store the detail of the restaurant. */
    data: Restaurant | null;
    /** Store the cart item details of the cart. */
    item: CartItem;
    /** Store the bill details of the cart item. */
    details: BillDetails;
    /** Stores the set quantity of items mapped by Card ID. */
    quantities: Record<string, number>;
    /** Callback function to handle the set quantity of items. */
    setQuantities: (
        quantities:
            | Record<string, number>
            | ((prev: Record<string, number>) => Record<string, number>),
    ) => void;
    /** Callback function to handle the add to cart functionality. */
    onAdd: () => void;
    /** Callback function to handle the delete functionality. */
    onRemove: () => void;
}
