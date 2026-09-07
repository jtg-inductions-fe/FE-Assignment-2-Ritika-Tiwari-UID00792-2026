import {
    Avatar,
    Box,
    Button,
    IconButton,
    styled,
    Toolbar,
} from '@mui/material';
import { NavLinkProps } from 'react-router-dom';

export const StyledAppBar = styled('header')(({ theme }) => ({
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
        paddingLeft: 8,
        paddingRight: 8,
    },
}));

// Left branding alignment setup
export const LogoContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
    '& img': {
        width: 24,
        height: 24,
        objectFit: 'contain',
    },
    '&:focus-visible': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: 2,
    },
}));

// Right container wrapper grouping actions
export const ActionsContainer = styled('nav')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    [theme.breakpoints.down('sm')]: {
        gap: 4,
    },
}));

export const StyledIconButton = styled(IconButton)<NavLinkProps>(
    ({ theme }) => ({
        padding: 8,
        textDecoration: 'none',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.text.primary,
    }),
);

export const ProfileIconButton = styled(IconButton)(({ theme }) => ({
    padding: 0,
    border: `4px solid ${theme.palette.primary.main}`,

    [theme.breakpoints.down('sm')]: {
        borderWidth: 2,
    },
}));

// Aligned Profile Context Box inside Popover
export const PopoverProfileBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    textAlign: 'center',
    minWidth: 250,
    gap: theme.spacing(2),
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
    width: 40,
    height: 40,
    boxShadow: theme.shadows[1],
}));

export const LogoutButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.error.main,
    '&:hover': {
        backgroundColor: theme.palette.error.dark,
    },
}));
