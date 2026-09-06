import { Link } from 'react-router-dom';

import {
    Avatar,
    Box,
    Button,
    IconButton,
    styled,
    Toolbar,
    Typography,
} from '@mui/material';

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
        marginRight: 8,
    },
    '&:focus-visible': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: 2,
        backgroundColor: theme.palette.action.selected,
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

export const NavText = styled(Typography)(({ theme }) => ({
    textDecoration: 'none',
    '&:hover': {
        color: theme.palette.primary.main,
    },
    '&:focus': {
        backgroundColor: theme.palette.action.hover,
    },
    // Better UX: Style specifically for keyboard navigation focus
    '&:focus-visible': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: 2,
        backgroundColor: theme.palette.action.selected,
    },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
    padding: 8,
    textDecoration: 'none',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.primary,
    '&:hover': {
        color: theme.palette.primary.main,
    },
    '&:focus': {
        backgroundColor: theme.palette.action.hover,
    },
    // Better UX: Style specifically for keyboard navigation focus
    '&:focus-visible': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: 2,
        backgroundColor: theme.palette.action.selected,
    },
    // Style when the link matches the active URL path
    '&.active': {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightBold,
    },
}));
export const StyledIconButton = styled(IconButton)(({ theme }) => ({
    padding: 8,
    textDecoration: 'none',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.primary,
    '&:hover': {
        color: theme.palette.primary.main,
    },
    '&:focus': {
        backgroundColor: theme.palette.action.hover,
    },
    // Better UX: Style specifically for keyboard navigation focus
    '&:focus-visible': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: 2,
        backgroundColor: theme.palette.action.selected,
    },
    // Style when the link matches the active URL path
    '&.active': {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightBold,
    },
}));

export const ProfileIconButton = styled(IconButton)(({ theme }) => ({
    padding: 0,
    border: `4px solid ${theme.palette.primary.main}`,
    // Make the avatar ring slightly smaller on small viewports
    [theme.breakpoints.down('sm')]: {
        borderWidth: 2,
    },
    '&:focus-visible': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: 2,
        backgroundColor: theme.palette.action.selected,
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
