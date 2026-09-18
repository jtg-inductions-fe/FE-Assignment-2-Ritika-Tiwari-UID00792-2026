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

/** Represents the possible values that can be assigned to status.
 * Status union type shown in the image represent the different phases of an asynchronous operation lifecycle (fetchUsers for the auth).
 */
export type Status = 'idle' | 'pending' | 'succeeded' | 'failed';
