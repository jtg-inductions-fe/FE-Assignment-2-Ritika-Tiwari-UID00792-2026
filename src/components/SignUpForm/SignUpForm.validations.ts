import { REGEX } from '@constant';

/**
 * Validation for the signup form fields
 */
export const signUpValidation = {
    /** validation for the name field */
    name: {
        required: 'Name is required',
    },
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
        minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
        },
        validate: {
            hasNumber: (value: string | undefined) =>
                REGEX.PASSWORD.HAS_NUMBER.test(value || '') ||
                'Password must contain at least one number',
            hasSpecialChar: (value: string | undefined) =>
                REGEX.PASSWORD.HAS_SPECIAL_CHARACTER.test(value || '') ||
                'Password must contain at least one special character',
        },
    },
};
