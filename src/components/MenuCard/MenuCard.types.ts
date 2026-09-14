import { Menu } from '@types';
/** Interface defining the types of properties that can be passed to restaurant card */
export interface MenuCardProps {
    /** Store the detail of the Menu Item. */
    menu: Menu;
    /** Stores the userRole to render the role based cards.  */
    userRole: string | undefined;
}
