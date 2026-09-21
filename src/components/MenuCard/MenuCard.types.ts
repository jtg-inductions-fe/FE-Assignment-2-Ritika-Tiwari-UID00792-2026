import { Dispatch, SetStateAction } from 'react';

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
    setQuantities: Dispatch<SetStateAction<Record<string, number>>>;
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
    /** Store the specific action status when a customer change their restaurant choice mid order. */
    confirmationType: string | null;
}
