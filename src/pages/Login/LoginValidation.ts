export const LoginValidation = {
    email: {
        required: 'Email is required',
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
        },
    },
    password: {
        required: 'Password is required',
        minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
        },
        validate: {
            hasNumber: (value: string) =>
                /\d/.test(value) || 'Password must contain at least one number',
            hasSpecialChar: (value: string) =>
                /[!@#$%^&*]/.test(value) ||
                'Password must contain at least one special character',
        },
    },
};
