import { Menu } from '@types';
/** Interface defining the types of properties that can be passed to restaurant card */
export interface MenuCardProps {
    /** Store the detail of the Menu Item. */
    menu: Menu;
    /** Stores the userRole to render the role based cards.  */
    userRole: string | undefined;
    /** Stores the set quantity of items mapped by Card ID. */
    quantities: Record<string, number>;
    /** Callback function to handle the set quantity of items. */
    setQuantities: (
        quantities:
            | Record<string, number>
            | ((prev: Record<string, number>) => Record<string, number>),
    ) => void;
    /** Callback function to handle the edit modal. */
    onEditClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Callback function to handle the delete functionality. */
    onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Callback function to handle the add to cart functionality. */
    onAddToCart: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Callback function to handle the add to cart functionality. */
    onIncreaseStock: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Callback function to handle the add to cart functionality. */
    onDecreaseStock: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
