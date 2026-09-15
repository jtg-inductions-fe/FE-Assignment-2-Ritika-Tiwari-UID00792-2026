import { useState } from 'react';

import { MenuItemModal } from 'components/MenuItemModal/MenuItemModal.component';
import { useParams } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Fab, Typography, useMediaQuery } from '@mui/material';

import fallBackImage from '@assets/images/fallback-image.webp';
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
    const {
        userRole,
        filteredMenuItems,
        handleDeleteMenuItem,
        handleAddToCart,
        handleIncreaseStock,
        handleDecreaseStock,
    } = useMenu(restaurantId);

    /** State to control the Add and edit modals. */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMenuItem, setEditingMenuItem] = useState<MenuData | null>(
        null,
    );

    // Track the item ID currently staged for deletion
    const [itemStagedForDeletion, setItemStagedForDeletion] = useState<
        string | null
    >(null);

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

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

    /**
     * Handles the confirmation event from the confirmation dialog.
     * @param confirmation - A boolean value defining user confirmation from the dialog.
     */
    const handleSubmit = (confirmation: boolean) => {
        setIsDialogOpen(false);

        if (confirmation && itemStagedForDeletion) {
            try {
                // Execute the deletion only after confirmation
                handleDeleteMenuItem(itemStagedForDeletion);
            } catch  {
                setIsSnackbarOpen(true);
            } finally {
                setItemStagedForDeletion(null);
            }
        } else {
            setItemStagedForDeletion(null);
        }
    };

    /**
     * Function to handle close event of confirmation dialog.
     */
    const handleClose = () => {
        setIsDialogOpen(false);
        setItemStagedForDeletion(null);
    };

    /**
     * Function to handle staging a menu item for deletion.
     * @param itemId - menu item id used to stage the deletion.
     */
    const handleOnDelete = (itemId: string) => {
        setItemStagedForDeletion(itemId);
        setIsDialogOpen(true);
    };

    /** Handle om add to cart functionality. */
    const handleOnAddToCart = (menu: MenuData) => {
        handleAddToCart(menu);
    };
    /** Handle om add to cart functionality. */
    const handleOnIncreaseStock = (id: string) => {
        handleIncreaseStock(id);
    };
    /** Handle om add to cart functionality. */
    const handleOnDecreaseStock = (id: string) => {
        handleDecreaseStock(id);
    };

    // Returns true if screen width is smaller than the 'md' breakpoint.
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [restImgSrc, setRestImgSrc] = useState(
        restaurantData?.imageUrl || fallBackImage,
    );
    return (
        <ResponsiveContainer>
            <StyledRestaurantBox>
                <StyledImage
                    src={restImgSrc}
                    onError={() => {
                        if (restImgSrc !== fallBackImage) {
                            setRestImgSrc(fallBackImage);
                        }
                    }}
                />
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
                        onAddToCart={(event) => {
                            event.stopPropagation();
                            handleOnAddToCart(menu);
                        }}
                        onDecreaseStock={(event) => {
                            event.stopPropagation();
                            handleOnDecreaseStock(menu.itemId);
                        }}
                        onIncreaseStock={(event) => {
                            event.stopPropagation();
                            handleOnIncreaseStock(menu.itemId);
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
