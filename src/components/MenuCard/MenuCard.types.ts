import { Menu } from '@types';
/** Interface defining the types of properties that can be passed to restaurant card */
export interface MenuCardProps {
    /** Store the detail of the Menu Item. */
    item: Menu;
    /** Stores the userRole to render the role based cards.  */
    userRole: string | undefined;
    /** Stores the set quantity of items mapped by Card ID. */
    quantities: Record<string, number>;
    /** Callback function to handle the set quantity of items. */
    setQuantities: (
        quantities:
            | Record<string, number>
            | ((prev: Record<string, number>) => Record<string, number>),
    ) => void;
    /** Callback function to handle the edit modal. */
    onEdit: () => void;
    /** Callback function to handle the delete functionality. */
    onDelete: () => void;
    /** Callback function to handle the add to cart functionality. */
    onPrimaryAction: () => void;
    /** Callback function to handle increase stock quantity functionality. */
    onIncrease: () => void;
    /** Callback function to handle decrease stock quantity functionality. */
    onDecrease: () => void;
     /** Store the status of the action when customer changing the restaurant to order. */
    confirmationType: string | null;
}
