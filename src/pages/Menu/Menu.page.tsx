import { useState } from 'react';

import { MenuItemModal } from 'components/MenuItemModal/MenuItemModal.component';
import { useParams } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Fab, Typography, useMediaQuery } from '@mui/material';

import {
    ConfirmationDialog,
    MenuCard,
    ResponsiveContainer,
    Snackbar,
} from '@components';
import { useMenu, useRestaurant } from '@hooks';
import { theme } from '@theme';
import { Menu as MenuData } from '@types';

import {
    StyledCardContent,
    StyledImage,
    StyledRestaurantBox,
} from './Menu.styles';

/**
 * Renders the Menu page.
 * @returns JSX.Element - The rendered Menu page.
 */
export const Menu = () => {
    const { restaurantId } = useParams();
    const { filteredRestaurants } = useRestaurant();
    const restaurantData = filteredRestaurants.find(
        (restaurant) => restaurant.restaurantId === restaurantId,
    );
    const { userRole, filteredMenuItems, handleDeleteMenuItem } =
        useMenu(restaurantId);

    /** State to control the Add and edit modals. */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMenuItem, setEditingMenuItem] = useState<MenuData | null>(
        null,
    );

    /** Handle Add restaurant modal open state. */
    const handleOpenAddModal = () => {
        setEditingMenuItem(null);
        setIsModalOpen(true);
    };

    /** Handle Edit restaurant modal open state. */
    const handleOpenEditModal = (menu: MenuData) => {
        setEditingMenuItem(menu);
        setIsModalOpen(true);
    };

    /** Handle edit and add restaurant modal closing state */
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingMenuItem(null);
    };

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

    /**
     * Handles the confirmation event from the confirmation dialog.
     * @param confirmation - A boolean value defining user confirmation from the dialog.
     */
    const handleSubmit = (confirmation: boolean) => {
        setIsDialogOpen(false);
        if (confirmation) {
            try {
                setIsDialogOpen(true);
            } catch (err) {
                if (err) {
                    setIsSnackbarOpen(true);
                }
            }
        }
    };

    /**
     * Function to handle close event of confirmation dialog.
     */
    const handleClose = () => {
        setIsDialogOpen(false);
    };

    /**
     * Function to handle delete restaurant event.
     * @param restaurantId - restaurant id is used to delete the selected restaurant.
     */
    const handleOnDelete = (itemId: string) => {
        setIsDialogOpen(true);
        handleDeleteMenuItem(itemId);
    };

    // Returns true if screen width is smaller than the 'md' breakpoint.
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <ResponsiveContainer>
            <StyledRestaurantBox>
                <StyledImage src={restaurantData?.imageUrl} />
                <StyledCardContent>
                    <Typography variant="h4">{restaurantData?.name}</Typography>
                    <Typography variant="body2">
                        {restaurantData?.description}
                    </Typography>
                    {userRole === 'owner' && !isMobile && (
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleOpenAddModal}
                        >
                            Add menu items
                        </Button>
                    )}
                </StyledCardContent>
            </StyledRestaurantBox>
            {/* Add Menu option will only show to owners */}
            {userRole === 'owner' && isMobile && (
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={handleOpenAddModal}
                >
                    <AddIcon />
                </Fab>
            )}

            <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                gap={theme.spacing(2)}
                alignItems="center"
                justifyContent="center"
                marginBlock={theme.spacing(3.2)}
            >
                {filteredMenuItems.map((menu) => (
                    <MenuCard
                        key={menu.itemId}
                        menu={menu}
                        userRole={userRole}
                        onEditClick={(event) => {
                            event.stopPropagation();
                            handleOpenEditModal(menu);
                        }}
                        onDelete={(event) => {
                            event.stopPropagation();
                            handleOnDelete(menu.itemId);
                        }}
                    />
                ))}
            </Box>
            {/* Reusable form modal for both edit and add menu item */}
            <MenuItemModal
                open={isModalOpen}
                onClose={handleCloseModal}
                restaurantId={restaurantId}
                MenuItemToEdit={editingMenuItem}
            />
            <ConfirmationDialog
                open={isDialogOpen}
                onClose={handleClose}
                onSubmit={handleSubmit}
                title="Confirmation Dialog"
                description="Are you sure you want to Delete?"
            />
            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={2000}
                onClose={() => setIsSnackbarOpen(false)}
                message="Some Error Occurred, Try later."
                state="error"
            />
        </ResponsiveContainer>
    );
};
