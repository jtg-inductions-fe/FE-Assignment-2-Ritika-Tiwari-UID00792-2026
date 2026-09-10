import { User } from '@types';

/** Represent the complete authentication state of the application */
export interface AuthState {
    /** Stores all registered users. */
    users: User[];
    /** Stores the currently authenticated user. */
    currentUser: User | null;
    /** Represents the current status of an authentication operation. */
    status: Status;
    /** Indicated whether a user is currently logged in. */
    isLoggedIn: boolean;
}

/** Represents the possible values that can be assigned to status. */
export type Status = 'idle' | 'pending' | 'succeeded' | 'failed';
