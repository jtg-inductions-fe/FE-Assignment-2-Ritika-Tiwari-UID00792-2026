import {
    Avatar,
    Box,
    Button,
    IconButton,
    styled,
    Toolbar,
    Typography,
    TypographyProps,
} from '@mui/material';

export const StyledAppBar = styled('header')(({ theme }) => ({
    position: 'static',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
        paddingLeft: '8px',
        paddingRight: '8px',
    },
}));

// Left branding alignment setup
export const LogoContainer = styled('a')({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
    '& img': {
        width: '24px',
        height: '24px',
        objectFit: 'contain',
        marginRight: '8px',
    },
});

export const CleanTypography = styled(Typography)<TypographyProps<'a'>>({
    textDecoration: 'none',
    fontWeight: 700,
});

// Right container wrapper grouping actions
export const ActionsContainer = styled('nav')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    // Dynamically adjust gaps based on screen size
    gap: '12px',
    [theme.breakpoints.down('sm')]: {
        gap: '4px',
    },
}));

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
        backgroundColor: 'transparent',
    },
    // Minimize internal button padding on small viewports
    [theme.breakpoints.down('sm')]: {
        padding: '4px 6px',
        minWidth: 'auto',
    },
}));

export const NavButtonText = styled(Typography)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.main,
    },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
    padding: '8px',
    color: theme.palette.text.primary,
    '&:hover': {
        color: theme.palette.primary.main,
    },
    // Remove extra click padding on small screens
    [theme.breakpoints.down('sm')]: {
        padding: '4px',
    },
}));

export const ProfileIconButton = styled(IconButton)(({ theme }) => ({
    padding: 0,
    border: `4px solid ${theme.palette.primary.main}`,
    // Make the avatar ring slightly smaller on small viewports
    [theme.breakpoints.down('sm')]: {
        borderWidth: '2px',
    },
}));

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
}));

export const UserEmailText = styled(Typography)({
    marginBottom: '12px',
});

export const LogoutButton = styled(Button)({
    marginTop: '8px',
});
