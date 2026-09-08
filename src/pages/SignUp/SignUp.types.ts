/**
 * Interface defining the configuration properties of the signup form.
 */
export interface SignupFormData {
    /** Unique id for the each user */
    id: string;
    /** Role of the user (customer or owner)*/
    role: UserRole;
    /** Name of the user  */
    name: string;
    /** Email of the user */
    email: string;
    /** Password for the user login */
    password: string;
    /** Confirmation password field for to confirm the password */
    confirmPassword?: string;
}

/**
 * Types for the user role
 */
export type UserRole = 'customer' | 'owner';
