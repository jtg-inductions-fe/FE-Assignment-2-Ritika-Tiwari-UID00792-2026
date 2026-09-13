export const REGEX = {
    EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    PASSWORD: {
        HAS_NUMBER: /\d/,
        HAS_SPECIAL_CHARACTER: /[!@#$%^&*]/,
    },
};
