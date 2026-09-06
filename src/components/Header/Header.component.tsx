import React from 'react';

import { useNavigate } from 'react-router-dom';

import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    Badge,
    Box,
    Divider,
    Popover,
    Tooltip,
    Typography,
    useMediaQuery,
} from '@mui/material';

import avatarImage from '@assets/images/avatar.webp';
import logo from '@assets/images/logo.webp';
import { ResponsiveContainer } from '@components';
import { theme } from '@theme';

import {
    ActionsContainer,
    LogoContainer,
    LogoutButton,
    NavText,
    PopoverProfileBox,
    ProfileIconButton,
    StyledAppBar,
    StyledIconButton,
    StyledLink,
    StyledToolbar,
    UserAvatar,
} from './Header.styles';

/**
 * Mock user data to show a logged-in user session.
 * Used for demo purposes to populate the profile and cart count.
 */
const mockUser = {
    userId: 1,
    name: 'emy Sharp',
    email: 'remy.sharp@example.com',
    avatarUrl: avatarImage,
    role: 'customer',
    cartCount: 4,
};

/**
 * Header Component
 *
 * Provides the global navigation bar, branding logo, navigation links,
 * and a contextual user profile dropdown menu.
 * @returns The rendered global application header.
 */
export const Header = (): React.ReactElement => {
    // State to track which HTML element anchors the user profile popover menu
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

    /**
     * Logs the user out by closing the popover and triggering auth cleanup actions.
     */
    const handleLogout = () => {
        handleCloseProfilePopover();
    };

    // Helper variables for accessibility and popover visibility state
    const isPopoverOpen = Boolean(anchorElUser);
    const popoverId = isPopoverOpen ? 'user-profile-popover' : undefined;

    const navigate = useNavigate();

    // Returns true if screen width is smaller than the 'md' breakpoint
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <StyledAppBar>
            <ResponsiveContainer>
                <StyledToolbar disableGutters>
                    {/* Branding / logo */}
                    <LogoContainer aria-label="Brand name and logo">
                        <StyledLink to="/home">
                            <Tooltip title="Logo">
                                <img
                                    src={logo}
                                    alt="Brand logo"
                                    role="presentation"
                                />
                            </Tooltip>
                            <Typography
                                variant="h6"
                                color="text.primary"
                                noWrap
                                fontWeight={theme.typography.fontWeightBold}
                            >
                                Swaad
                            </Typography>
                        </StyledLink>
                    </LogoContainer>

                    {/* Actions and navigation */}
                    <ActionsContainer aria-label="Main Navigation">
                        {!isMobile ? (
                            <StyledLink to="/order-portal">
                                <NavText
                                    variant="button"
                                    color="text.primary"
                                    title="Orders"
                                    textTransform="none"
                                >
                                    Orders
                                </NavText>
                            </StyledLink>
                        ) : (
                            <StyledIconButton
onClick={() => {
  void navigate('/order-portal');
}}
                                aria-label="Track your orders"
                            >
                                <AssignmentIcon />
                            </StyledIconButton>
                        )}
                        {/* Shopping Cart Icon (Visible to customers only) */}
                        {mockUser.role === 'customer' && (
                            <Tooltip title="View Cart">
                                <StyledIconButton
onClick={() => {
  void navigate('/cart');
}}
                                    aria-label={`${mockUser.cartCount} items in cart`}
                                >
                                    <Badge
                                        badgeContent={mockUser.cartCount}
                                        color="error"
                                    >
                                        <ShoppingCartIcon />
                                    </Badge>
                                </StyledIconButton>
                            </Tooltip>
                        )}

                        {/* User profile avatar triggers */}
                        <Tooltip title="Open profile settings">
                            <ProfileIconButton
                                onClick={handleOpenProfilePopover}
                                aria-describedby={popoverId}
                                aria-haspopup="true"
                                aria-expanded={isPopoverOpen}
                            >
                                <UserAvatar
                                    alt={mockUser.name}
                                    src={mockUser.avatarUrl}
                                />
                            </ProfileIconButton>
                        </Tooltip>
                    </ActionsContainer>
                </StyledToolbar>

                {/* User profile contextual popover */}
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
                        <UserAvatar
                            alt={mockUser.name}
                            src={mockUser.avatarUrl}
                        />
                        <Box>
                            <Typography variant="h6" fontWeight="bold">
                                {mockUser.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {mockUser.email}
                            </Typography>
                        </Box>
                        <Divider flexItem />
                        <LogoutButton
                            variant="contained"
                            color="error"
                            fullWidth
                            onClick={handleLogout}
                        >
                            Logout
                        </LogoutButton>
                    </PopoverProfileBox>
                </Popover>
            </ResponsiveContainer>
        </StyledAppBar>
    );
};
