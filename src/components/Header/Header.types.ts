import { User } from '@types';

/** Interface defining the configuration properties for the header component. */
export interface HeaderProps {
    /** This is for the registered user data. */
    user: User | null;
    /** This is for the cart count to update the cart badge to track items in the cart. */
    cartCount: number;
    /** Flag to track the logged in status of user. */
    isLoggedIn: boolean;
}
