import * as React from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    Avatar,
    Badge,
    Divider,
    Popover,
    Tooltip,
    Typography,
} from '@mui/material';

// Asset & Style Imports
import logo from '@assets/images/logo.webp';
import {
    ActionsContainer,
    CartIconButton,
    CleanTypography,
    LogoContainer,
    LogoutButton,
    MobileOrdersBox,
    NavButton,
    NavButtonText,
    OrderIconButton,
    PopoverProfileBox,
    ProfileIconButton,
    StyledAppBar,
    StyledMenuItemBox,
    StyledToolbar,
    UserEmailText,
} from './Header.styles';
import { ResponsiveContainer } from '../Container/ResponsiveContainer.component';

/**
 * Mock user data simulating a logged-in user session.
 * Used for demo purposes to populate the profile and cart count.
 */
const mockUser = {
    name: 'Remy Sharp',
    email: 'remy.sharp@example.com',
    avatarUrl: '/static/images/avatar/2.jpg',
    role: 'customer',
    cartCount: 4,
};

/**
 * Header Component
 *
 * Provides the global navigation bar, branding logo, navigation links,
 * and a contextual user profile dropdown menu.
 *
 * @component
 * @returns {React.ReactElement} The rendered global application header.
 */
function Header() {
    // State to track which HTML element anchors the user profile popover menu
    const [anchorElUser, setAnchorElUser] =
        React.useState<HTMLButtonElement | null>(null);

    /**
     * Opens the user profile popover menu by setting the anchor element.
     * @param {React.MouseEvent<HTMLButtonElement>} event - The click event from the avatar button.
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
        // TODO: Add authentication logout dispatch actions here
    };

    // Helper variables for accessibility (a11y) and popover visibility state
    const isPopoverOpen = Boolean(anchorElUser);
    const popoverId = isPopoverOpen ? 'user-profile-popover' : undefined;

    return (
        <StyledAppBar>
            <ResponsiveContainer>
                <StyledToolbar disableGutters>
                    {/* BRANDING / LOGO */}
                    <LogoContainer href="/" aria-label="Swaad Home">
                        <img src={logo} alt="" role="presentation" />
                        <CleanTypography
                            variant="h6"
                            color="text.primary"
                            noWrap
                            className="header-logo"
                        >
                            Swaad
                        </CleanTypography>
                    </LogoContainer>

                    {/* ACTIONS & NAVIGATION */}
                    <ActionsContainer aria-label="Main Navigation">
                        {/* Desktop Navigation Links */}
                        <StyledMenuItemBox>
                            <NavButton href="/home">
                                <NavButtonText
                                    variant="button"
                                    color="text.primary"
                                >
                                    Home
                                </NavButtonText>
                            </NavButton>
                            <NavButton href="/orders">
                                <NavButtonText
                                    variant="button"
                                    color="text.primary"
                                >
                                    Orders
                                </NavButtonText>
                            </NavButton>
                        </StyledMenuItemBox>

                        {/* Mobile Viewport Orders Shortcut */}
                        <MobileOrdersBox>
                            <Tooltip title="Orders">
                                <OrderIconButton
                                    aria-label="Track your orders"
                                    color="default"
                                >
                                    <AssignmentIcon />
                                </OrderIconButton>
                            </Tooltip>
                        </MobileOrdersBox>

                        {/* Shopping Cart Icon (Visible to customers only) */}
                        {mockUser.role === 'customer' && (
                            <Tooltip title="View Cart">
                                <CartIconButton
                                    aria-label={`${mockUser.cartCount} items in cart`}
                                    color="default"
                                >
                                    <Badge
                                        badgeContent={mockUser.cartCount}
                                        color="error"
                                    >
                                        <ShoppingCartIcon />
                                    </Badge>
                                </CartIconButton>
                            </Tooltip>
                        )}

                        {/* User Profile Avatar Trigger */}
                        <Tooltip title="Open profile settings">
                            <ProfileIconButton
                                onClick={handleOpenProfilePopover}
                                aria-describedby={popoverId}
                                aria-haspopup="true"
                                aria-expanded={isPopoverOpen}
                            >
                                <Avatar
                                    alt={mockUser.name}
                                    src={mockUser.avatarUrl}
                                />
                            </ProfileIconButton>
                        </Tooltip>
                    </ActionsContainer>
                </StyledToolbar>

                {/* USER PROFILE CONTEXTUAL POPOVER */}
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
                        <Avatar
                            alt={mockUser.name}
                            src={mockUser.avatarUrl}
                            sx={{ width: 56, height: 56, mb: 1 }}
                        />
                        <Typography variant="h6" fontWeight="bold">
                            {mockUser.name}
                        </Typography>
                        <UserEmailText variant="body2" color="text.secondary">
                            {mockUser.email}
                        </UserEmailText>
                        <Divider flexItem sx={{ my: 1.5 }} />
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
}

export default Header;
