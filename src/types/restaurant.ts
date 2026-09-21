import { DietaryCategory } from './menu';

/**
 * Interface defining the restaurant data types.
 */
export interface Restaurant {
    /** Unique identifier for the restaurant. */
    restaurantId: string;

    /** Unique identifier of the owner of the restaurant. */
    ownerId: string;

    /** Display name of the restaurant. */
    name: string;

    /** A brief summary or details about the restaurant. */
    description: string;

    /** The time the restaurant opens. */
    openingTime: string;

    /** The time the restaurant closes. */
    closingTime: string;

    /** Physical street address of the restaurant. */
    address: string;

    /** URL of the restaurant's cover or profile image. */
    imageUrl: string;

    /** The category or cuisine type of the restaurant. veg/non-veg */
    dietaryCategory: DietaryCategory;
}

export type RestaurantStatus = 'EMPTY' | 'MATCH' | 'CONFLICT';
