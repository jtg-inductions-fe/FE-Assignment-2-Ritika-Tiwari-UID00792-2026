import {
    AppBar,
    Avatar,
    Box,
    Button,
    IconButton,
    styled,
    Toolbar,
    Typography,
    TypographyProps,
} from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
}));

export const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

// Left branding alignment setup
export const LogoContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& img': {
        width: '36px',
        height: '36px',
        objectFit: 'contain',
        marginRight: '8px',
    },
});

export const BrandTypography = styled(Typography)<TypographyProps<'a'>>(
    ({ theme }) => ({
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.1rem',
        color: theme.palette.text.primary,
        textDecoration: 'none',
        display: 'flex',
    }),
);

// Right container wrapper grouping actions
export const ActionsContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
});

// Navigation menu box - hides text tabs on small screens
export const StyledMenuItemBox = styled(Box)(({ theme }) => ({
    alignItems: 'center',
    gap: '16px',
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

// Single icon container for orders - only visible on mobile/tablet viewports
export const MobileOrdersBox = styled(Box)(({ theme }) => ({
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
    [theme.breakpoints.down('md')]: {
        display: 'flex',
    },
}));

export const NavButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    '&:hover': {
        textTransform: 'underline',
    },
}));

export const NavButtonText = styled(Typography)({
    textTransform: 'uppercase',
});

export const CartIconButton = styled(IconButton)({
    padding: '8px',
});

export const ProfileIconButton = styled(IconButton)({
    padding: 0,
});

// Aligned Profile Context Box inside Popover
export const PopoverProfileBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    textAlign: 'center',
    minWidth: '250px',
});

export const UserAvatar = styled(Avatar)(({ theme }) => ({
    width: 64,
    height: 64,
    marginBottom: '12px',
    boxShadow: theme.shadows[1],
    border: `4px solid ${theme.palette.primary.main}`,
}));

export const UserEmailText = styled(Typography)({
    marginBottom: '12px',
});

export const LogoutButton = styled(Button)({
    marginTop: '8px',
});
