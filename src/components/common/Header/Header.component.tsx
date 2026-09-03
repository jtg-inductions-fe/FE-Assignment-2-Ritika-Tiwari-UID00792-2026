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
    UserAvatar,
    UserEmailText,
} from './Header.styles';
import { ResponsiveContainer } from '../Container/ResponsiveContainer.component';

// This is for the demo purpose only
const mockUser = {
    name: 'Remy Sharp',
    email: 'remy.sharp@example.com',
    avatarUrl: '/static/images/avatar/2.jpg',
    role: 'customer',
    cartCount: 4,
};

function Header() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null,
    );

    // Profile Popover handlers
    const handleOpenProfilePopover = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseProfilePopover = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        handleCloseProfilePopover();
    };

    const isPopoverOpen = Boolean(anchorElUser);

    return (
        <StyledAppBar position="static">
            <ResponsiveContainer>
                <StyledToolbar disableGutters>
                    {/* ================= LEFT SIDE: BRANDING / LOGO ================= */}
                    <LogoContainer>
                        <img src={logo} alt="Company Logo" />
                        <CleanTypography
                            variant="h6"
                            color="text.primary"
                            noWrap
                            component="a"
                            href="#"
                            className="header-logo"
                        >
                            Swaad
                        </CleanTypography>
                    </LogoContainer>

                    {/* ================= RIGHT SIDE: ACTIONS & NAVIGATION ================= */}
                    <ActionsContainer>
                        {/* Desktop Link items (Hidden on mobile) */}
                        <StyledMenuItemBox>
                            <NavButton>
                                <NavButtonText
                                    variant="button"
                                    color="text.primary"
                                >
                                    Home
                                </NavButtonText>
                            </NavButton>
                            <NavButton>
                                <NavButtonText
                                    variant="button"
                                    color="text.primary"
                                >
                                    Orders
                                </NavButtonText>
                            </NavButton>
                        </StyledMenuItemBox>

                        {/* Mobile/Tablet Viewport Orders Shortcut Icon (Hidden on desktop) */}
                        <MobileOrdersBox>
                            <Tooltip title="Orders">
                                <OrderIconButton
                                    aria-label="orders tracking"
                                    color="default"
                                >
                                    <AssignmentIcon />
                                </OrderIconButton>
                            </Tooltip>
                        </MobileOrdersBox>

                        {/* Conditional Cart Action Icon */}
                        {mockUser.role === 'customer' && (
                            <Tooltip title="View Cart">
                                <CartIconButton
                                    aria-label="shopping cart"
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
                        <Tooltip title="User Profile">
                            <ProfileIconButton
                                onClick={handleOpenProfilePopover}
                            >
                                <Avatar
                                    alt={mockUser.name}
                                    src={mockUser.avatarUrl}
                                />
                            </ProfileIconButton>
                        </Tooltip>
                    </ActionsContainer>
                </StyledToolbar>
                {/* ================= USER PROFILE CONTEXTUAL POPOVER ================= */}
                <Popover
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
                        <Typography variant="h6" fontWeight="bold">
                            {mockUser.name}
                        </Typography>
                        <UserEmailText variant="body2" color="text.secondary">
                            {mockUser.email}
                        </UserEmailText>

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
}

export default Header;
