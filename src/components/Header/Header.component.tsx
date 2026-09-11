import React, { useState } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';

import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    Badge,
    Box,
    Button,
    Divider,
    IconButton,
    Link,
    Popover,
    Tooltip,
    Typography,
    useMediaQuery,
} from '@mui/material';

import logo from '@assets/images/logo.webp';
import { ConfirmationDialog, ResponsiveContainer } from '@components';
import { useAuth } from '@hooks';
import { theme } from '@theme';

import {
    ActionsContainer,
    LogoContainer,
    PopoverProfileBox,
    StyledAppBar,
    StyledIconButton,
    StyledToolbar,
    UserAvatar,
} from './Header.styles';
import { HeaderProps } from './Header.types';
import { ROUTES } from '@routes';

/**
 * Header Component
 *
 * Provides the global navigation bar, branding logo, navigation links,
 * and a contextual user profile dropdown menu.
 * @param The configuration properties for the rendering Header component.
 * @returns The rendered global application header.
 */
export const Header = ({
    user,
    cartCount,
    isLoggedIn,
}: HeaderProps): React.ReactElement => {
    // State to track which HTML element anchors the user profile popover menu.
    const [anchorElUser, setAnchorElUser] =
        React.useState<HTMLButtonElement | null>(null);

    /**
     * Opens the user profile popover menu by setting the anchor element.
     * @param event - The click event from the avatar button.
     */
    const handleOpenProfilePopover = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        setAnchorElUser(event.currentTarget);
    };

    /**
     * Closes the user profile popover menu by clearing the anchor element state.
     */
    const handleCloseProfilePopover = () => {
        setAnchorElUser(null);
    };

    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    /**
     * Handles the confirmation event from the confirmation dialog.
     * @param confirmation - A boolean value defining user confirmation from the dialog.
     */
    const handleSubmit = (confirmation: boolean) => {
        setIsDialogOpen(false);
        if (confirmation) {
            try {
                handleLogout();
                setIsDialogOpen(true);
                void navigate(ROUTES.LOGIN);
            } catch (error) {
                if (error) {
                    void navigate(ROUTES.ROOT);
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
     * Logs the user out by closing the popover and triggering auth cleanup actions.
     */
    const onLogout = () => {
        handleCloseProfilePopover();
        setIsDialogOpen(true);
    };

    // Helper variables for accessibility and popover visibility state.
    const isPopoverOpen = Boolean(anchorElUser);
    const popoverId = isPopoverOpen ? 'user-profile-popover' : undefined;

    // Returns true if screen width is smaller than the 'md' breakpoint.
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <StyledAppBar>
            <ResponsiveContainer>
                <StyledToolbar disableGutters>
                    {/* Branding / logo */}
                    <LogoContainer aria-label="Brand name and logo">
                        <Link
                            component={NavLink}
                            to={ROUTES.ROOT}
                            title="Go to Home"
                        >
                            <img
                                src={logo}
                                alt="Brand logo"
                                role="presentation"
                            />
                        </Link>
                        <Typography
                            variant="h6"
                            color="text.primary"
                            noWrap
                            fontWeight={theme.typography.fontWeightBold}
                            marginLeft={theme.spacing(2)}
                        >
                            Swaad
                        </Typography>
                    </LogoContainer>

                    {/* Actions and navigation */}
                    {isLoggedIn && (
                        <ActionsContainer aria-label="Main Navigation">
                            {!isMobile ? (
                                <Link
                                    component={NavLink}
                                    to={ROUTES.ORDER_PORTAl}
                                >
                                    Orders
                                </Link>
                            ) : (
                                <Tooltip title="Go to order portal">
                                    <StyledIconButton
                                        LinkComponent={NavLink}
                                        to={ROUTES.ORDER_PORTAl}
                                        aria-label="Track your orders"
                                    >
                                        <AssignmentIcon />
                                    </StyledIconButton>
                                </Tooltip>
                            )}

                            {/* Shopping Cart Icon (Visible to customers only) */}
                            {user?.role === 'customer' && (
                                <Tooltip title="View Cart">
                                    <StyledIconButton
                                        LinkComponent={NavLink}
                                        to={ROUTES.CART}
                                        aria-label="4 items in cart"
                                    >
                                        <Badge
                                            badgeContent={cartCount}
                                            color="error"
                                        >
                                            <ShoppingCartIcon />
                                        </Badge>
                                    </StyledIconButton>
                                </Tooltip>
                            )}

                            {/* User profile avatar triggers */}
                            <Tooltip title="Open profile settings">
                                <IconButton
                                    variant="outlined"
                                    onClick={handleOpenProfilePopover}
                                    aria-describedby={popoverId}
                                    aria-haspopup="true"
                                    aria-expanded={isPopoverOpen}
                                >
                                    <UserAvatar alt={user?.name} />
                                </IconButton>
                            </Tooltip>
                        </ActionsContainer>
                    )}
                </StyledToolbar>

                {/* User profile contextual popover */}
                {isLoggedIn && (
                    <Popover
                        id={popoverId}
                        open={isPopoverOpen}
                        anchorEl={anchorElUser}
                        onClose={handleCloseProfilePopover}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <PopoverProfileBox>
                            <UserAvatar alt={user?.name} />
                            <Box>
                                <Typography variant="h6" fontWeight="bold">
                                    {user?.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {user?.email}
                                </Typography>
                            </Box>
                            <Divider flexItem />
                            <Button
                                variant="error"
                                fullWidth
                                onClick={onLogout}
                            >
                                Logout
                            </Button>
                        </PopoverProfileBox>
                    </Popover>
                )}
                <ConfirmationDialog
                    open={isDialogOpen}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                    title="Confirmation Dialog"
                    description="Are you sure you want to logout?"
                />
            </ResponsiveContainer>
        </StyledAppBar>
    );
};
