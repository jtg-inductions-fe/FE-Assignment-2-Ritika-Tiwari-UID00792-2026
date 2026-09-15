export interface Menu {
    restaurantId: string | undefined;
    itemId: string;
    name: string;
    description: string;
    imageUrl: string;
    type: string;
    price: number;
    stock: number;
}
