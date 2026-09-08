<<<<<<< HEAD
/**
 * Validation for the signup form fields
 */
export const SignupValidation = {
    /** validation for the name field */
    name: {
        required: 'Name is required',
    },
    /** validation for the email field */
=======
export const SignupValidation = {
    name: {
        required: 'Name is required',
    },
>>>>>>> 6dc3aa1 ([RT_A2_03]: feat: Add the useLogin custom hook for the login.)
    email: {
        required: 'Email is required',
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
        },
    },
<<<<<<< HEAD
    /** validation for the password field */
=======
>>>>>>> 6dc3aa1 ([RT_A2_03]: feat: Add the useLogin custom hook for the login.)
    password: {
        required: 'Password is required',
        minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long',
        },
    },
};
