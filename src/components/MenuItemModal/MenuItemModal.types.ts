import { Menu } from '@types';

/**
 * Interface defining the configuration properties of the Add and edit MenuItem form.
 */
export interface MenuItemModalProps {
    /** Stores the open state of the modal. */
    open: boolean;
    /** Callback to handle close event of modal. */
    onClose: () => void;
    /** Stores the id for the current restaurant. */
    id: string | undefined;
    itemToEdit?: Menu | null;
    /** Callback function to handle add functionality like add restaurant and menu items. */
    onAdd: (data: Menu) => void;
    /** Callback function to handle edit functionality like edit restaurant and menu items. */
    onEdit: (data: Menu) => void;
}
