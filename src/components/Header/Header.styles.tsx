import { NavLinkProps } from 'react-router-dom';

import { Avatar, Box, IconButton, styled, Toolbar } from '@mui/material';

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
export const LogoContainer = styled('div')(({ theme }) => ({
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
        alignItems: 'center',
        color: theme.palette.text.primary,
    }),
);

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
