import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Menu } from '@types';

import { MenuState } from './menu.types';

/**
 * Initialize the menus state
 */
const initialState: MenuState = {
    menuItems: [],
    loading: false,
    error: null,
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        /** Store the menu data in the redux store.*/
        setMenuItems: (state, action: PayloadAction<Menu[]>) => {
            state.menuItems = action.payload;
        },

        /** Add new menu data in the redux store. */
        addMenuItems: (state, action: PayloadAction<Menu>) => {
            state.menuItems.push(action.payload);
        },
        /** Edit the menu data in the redux store. */
        editMenuItems: (state, action: PayloadAction<Menu>) => {
            // find the menu index from the redux store and update the data of menu.
            const index = state.menuItems.findIndex(
                (m) => m.itemId === action.payload.itemId,
            );
            if (index !== -1) {
                state.menuItems[index] = action.payload;
            }
        },
        /** Delete the menu for the given menu id from the redux store. */
        deleteMenuItems: (state, action: PayloadAction<string>) => {
            const idToDelete = action.payload;
            state.menuItems = state.menuItems.filter(
                (m) => m.itemId !== idToDelete,
            );
        },
        /** Reducer to decrement stock when added to cart */
        decrementStock: (state, action: PayloadAction<string>) => {
            const menuItem = state.menuItems.find(
                (item) => item.itemId === action.payload,
            );
            if (menuItem && menuItem.stock > 0) {
                menuItem.stock -= 1; // Immer allows direct mutation safely
            }
        },

        /** Reducer to decrement stock when added to cart */
        incrementStock: (state, action: PayloadAction<string>) => {
            const menuItem = state.menuItems.find(
                (item) => item.itemId === action.payload,
            );
            if (menuItem && menuItem.stock > 0) {
                menuItem.stock += 1; // Immer allows direct mutation safely
            }
        },

        /** Sets the loading state. */
        setMenuLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        /** Sets the error state. */
        setMenuError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
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
