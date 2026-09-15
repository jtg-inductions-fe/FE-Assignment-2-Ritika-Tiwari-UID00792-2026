import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Menu } from '@types';

import { MenuState } from './menu.types';

/**
 * Initialize the menu state
 */
const initialState: MenuState = {
    menuItems: [],
    menuLoading: false,
    menuError: null,
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        /** Store the menu data in the redux store.*/
        setMenuItems: (state, action: PayloadAction<Menu[]>) => {
            state.menuItems = action.payload;
        },

        /** Add new menu item data in the redux store. */
        addMenuItems: (state, action: PayloadAction<Menu>) => {
            state.menuItems.push(action.payload);
        },

        /** Edit the menu item data in the redux store. */
        editMenuItems: (state, action: PayloadAction<Menu>) => {
            // find the menu item index from the redux store and update the data of menu item.
            const index = state.menuItems.findIndex(
                (m) => m.itemId === action.payload.itemId,
            );
            if (index !== -1) {
                state.menuItems[index] = action.payload;
            }
        },

        /** Delete the menu item for the given menu id from the redux store. */
        deleteMenuItems: (state, action: PayloadAction<string>) => {
            const idToDelete = action.payload;
            state.menuItems = state.menuItems.filter(
                (m) => m.itemId !== idToDelete,
            );
        },

        /** Reducer to decrement stock of a menu item. */
        decrementStock: (
            state,
            action: PayloadAction<{ id: string; quantity?: number }>,
        ) => {
            const { id, quantity = 1 } = action.payload;
            const menuItem = state.menuItems.find((item) => item.itemId === id);
            if (menuItem && menuItem.stock > 0) {
                menuItem.stock -= quantity;
            }
        },

        /** Reducer to increment stock of a menu item. */
        incrementStock: (state, action: PayloadAction<string>) => {
            const menuItem = state.menuItems.find(
                (item) => item.itemId === action.payload,
            );
            if (menuItem) {
                menuItem.stock += 1;
            }
        },

        /** Sets the loading state. */
        setMenuLoading: (state, action: PayloadAction<boolean>) => {
            state.menuLoading = action.payload;
        },
        /** Sets the error state. */
        setMenuError: (state, action: PayloadAction<string | null>) => {
            state.menuError = action.payload;
        },
    },
});

export const {
    setMenuItems,
    addMenuItems,
    deleteMenuItems,
    editMenuItems,
    setMenuLoading,
    setMenuError,
    incrementStock,
    decrementStock,
} = menuSlice.actions;

export default menuSlice.reducer;
