/**
 * Validation for the Add and Edit modal's form fields.
 */
export const RestaurantValidation = {
    /** Validations for restaurant's name. */
    name: {
        required: 'Restaurant name is required',
        minLength: { value: 3, message: 'Name must be at least 3 characters' },
        maxLength: { value: 50, message: 'Name cannot exceed 50 characters' },
    },
    /** Validations for restaurant's description. */
    description: {
        required: 'Description is required',
        minLength: {
            value: 10,
            message: 'Description must be at least 10 characters',
        },
        maxLength: {
            value: 300,
            message: 'Description cannot exceed 300 characters',
        },
    },
    /** Validations for restaurant's opening time. */
    openingTime: {
        required: 'Opening time is required',
    },
    /** Validations for restaurant's closing time. */
    closingTime: {
        required: 'Closing time is required',
    },
    /** Validations for restaurant's Address. */
    address: {
        required: 'Address is required',
        minLength: {
            value: 5,
            message: 'Address must be at least 5 characters',
        },
    },
    /** Validations for restaurant's imageUrl. */
    imageUrl: {
        required: 'Image URL is required',
        pattern: {
            value: /^\/?([\w.-]+\/)*[\w.-]+\.[a-zA-Z0-9]{2,6}$/,
            message: 'Please enter a valid URL',
        },
    },
    /** Validations for restaurant's type. */
    type: {
        required: 'Cuisine type selection is required',
    },
};
