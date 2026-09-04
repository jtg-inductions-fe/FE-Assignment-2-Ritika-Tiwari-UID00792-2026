<<<<<<< HEAD
import { NavLinkProps } from 'react-router-dom';

import { Avatar, Box, IconButton, styled, Toolbar } from '@mui/material';
=======
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
import { Link } from 'react-router-dom';
>>>>>>> b4a7c78 ([RT_A2_02]: fix: fix the tab navigation and added the focus visible styles.)

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
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
    },
}));

// Left branding alignment setup
export const LogoContainer = styled('a')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    '& img': {
        width: 24,
        height: 24,
        objectFit: 'contain',
    },
    '&:focus-visible': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: '2px',
        backgroundColor: theme.palette.action.selected,
    },
}));

// Right container wrapper grouping actions
export const ActionsContainer = styled('nav')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        gap: theme.spacing(1),
    },
}));

export const StyledIconButton = styled(IconButton)<NavLinkProps>(
    ({ theme }) => ({
        padding: theme.spacing(0.5),
        textDecoration: 'none',
        textAlign: 'center',
        display: 'flex',
<<<<<<< HEAD
        alignItems: 'center',
        color: theme.palette.text.primary,
    }),
);
=======
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
        outlineOffset: '2px',
        backgroundColor: theme.palette.action.selected,
    },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
    padding: '8px',
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
        outlineOffset: '2px',
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
        borderWidth: '2px',
    },
    '&:focus-visible': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: '2px',
        backgroundColor: theme.palette.action.selected,
    },
}));
>>>>>>> b4a7c78 ([RT_A2_02]: fix: fix the tab navigation and added the focus visible styles.)

// Aligned Profile Context Box inside Popover
export const PopoverProfileBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1.5),
    textAlign: 'center',
    minWidth: 250,
    gap: theme.spacing(2),
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
    width: 40,
    height: 40,
    boxShadow: theme.shadows[1],
}));
