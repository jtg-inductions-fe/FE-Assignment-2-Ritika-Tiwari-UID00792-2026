import { User } from '@types';

/** Represent the complete authentication state of the application */
export interface AuthState {
    /** Stores all registered users. */
    users: User[];
    /** Stores the currently authenticated user. */
    currentUser: User | null;
    /** Indicated whether a user is currently logged in. */
    isLoggedIn: boolean;
}
