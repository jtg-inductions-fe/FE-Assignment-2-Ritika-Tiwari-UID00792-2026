import { User } from '@types';

export interface HeaderProps {
    /** This is for the registered user data. */
    user: User | null;
    /* This is for the cart count to update the cart badge to track items in the cart. */
    cartCount: number;
    /* flag to track the logged in status of user. */
    isLoggedIn: boolean;
}
