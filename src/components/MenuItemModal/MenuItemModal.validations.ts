/**
 * Validation for the Add and Edit modal's form fields.
 */
export const menuItemValidation = {
    /** Validations for menu item's name. */
    name: {
        required: 'MenuItem name is required',
        minLength: { value: 3, message: 'Name must be at least 3 characters' },
        maxLength: { value: 50, message: 'Name cannot exceed 50 characters' },
    },
    /** Validations for menu item's description. */
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

    /** Validation for price. */
    price: {
        required: 'Price is required',
        min: 'Price must be greater than or equal to 0',
    },

    /** Validation for stock quantity. */
    stockQuantity: {
        required: 'Stock quantity is required',
        min: 'Stock quantity cannot be less than 0',
        integer: 'Stock quantity must be a whole number',
    },

    /** Validations for MenuItem's imageUrl. */
    imageUrl: {
        required: 'Image URL is required',
        pattern: {
            value: /^\/?([\w.-]+\/)*[\w.-]+\.[a-zA-Z0-9]{2,6}$/,
            message: 'Please enter a valid URL',
        },
    },
    /** Validations for MenuItem's type. */
    type: {
        required: 'Cuisine type selection is required',
    },
};
