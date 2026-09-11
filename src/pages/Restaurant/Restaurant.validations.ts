export const RestaurantValidation = {
  name: {
    required: 'Restaurant name is required',
    minLength: { value: 3, message: 'Name must be at least 3 characters' },
    maxLength: { value: 50, message: 'Name cannot exceed 50 characters' },
  },
  description: {
    required: 'Description is required',
    minLength: { value: 10, message: 'Description must be at least 10 characters' },
    maxLength: { value: 300, message: 'Description cannot exceed 300 characters' },
  },
  openingTime: {
    required: 'Opening time is required',
  },
  closingTime: {
    required: 'Closing time is required',
  },
  address: {
    required: 'Address is required',
    minLength: { value: 5, message: 'Address must be at least 5 characters' },
  },
  imageUrl: {
    required: 'Image URL is required',
    pattern: {
      value: /^\/?([\w.-]+\/)*[\w.-]+\.[a-zA-Z0-9]{2,6}$/,
      message: 'Please enter a valid URL',
    },
  },
  type: {
    required: 'Cuisine type selection is required',
  },
};
