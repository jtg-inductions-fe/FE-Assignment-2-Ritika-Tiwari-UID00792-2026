import { Menu } from '@types';

/**
 * Interface defining the configuration properties of the Add and edit MenuItem form.
 */
export interface MenuItemModalProps {
    open: boolean;
    onClose: () => void;
    restaurantId: string | undefined;
    menuItemToEdit?: Menu | null;
}
