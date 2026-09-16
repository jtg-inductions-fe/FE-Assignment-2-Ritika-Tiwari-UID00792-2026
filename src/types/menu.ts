/** Interface defining the configuration properties for the menu item. */
export interface Menu {
    /** Restaurant id associated to each menu item. */
    restaurantId: string | undefined;
    /** Menu id to uniquely identify the menu item. */
    itemId: string;
    /** Name of the menu item. */
    name: string;
    /** Brief summary about the menu item. */
    description: string;
    /** Image Url of the image of the item */
    imageUrl: string;
    /** Define the type of the type of the item. */
    type: string;
    /** Price of the menu Item. */
    price: number;
    /** Stock quantity for the menu item. */
    stock: number;
}
