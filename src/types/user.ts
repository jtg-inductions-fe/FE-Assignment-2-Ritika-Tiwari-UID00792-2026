/**
 * Defines the types of user role.
 */
export type UserRole = 'customer' | 'owner';

/**
 * Represents a registered user in the application.
 */
export interface User {
    /** Unique ID used to identify the user in the database. */
    id: string;

    /** Full name of the user. */
    name: string;

    /** Email address used for logging in and notifications. */
    email: string;

    /** password for authentication. */
    password: string;

    /** The role assigned to the user ('customer' or 'owner'). */
    role: UserRole;
}
