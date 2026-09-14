import { REGEX } from '@constant';

/**
 * Validation for the login form fields
 */
export const loginValidation = {
    /** validation for the email field */
    email: {
        required: 'Email is required',
        pattern: {
            value: REGEX.EMAIL,
            message: 'Invalid email address',
        },
    },
    /** validation for the password field */
    password: {
        required: 'Password is required',
    },
};
