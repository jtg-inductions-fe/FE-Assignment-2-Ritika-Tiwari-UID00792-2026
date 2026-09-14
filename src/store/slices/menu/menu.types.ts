import { Menu } from '@types';
/** Represent the complete menu Items state of the application */
export interface MenuState {
    /** Stores menu Items list */
    menuItems: Menu[];
    /** Stores loading state for menu Items list */
    loading: boolean;
    /** Stores error state for menu Items list */
    error: string | null;
}
