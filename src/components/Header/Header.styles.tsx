import { NavLinkProps } from 'react-router-dom';

import { Avatar, Box, IconButton, styled, Toolbar } from '@mui/material';

import { HEADER_HEIGHT } from '@constant';

export const StyledAppBar = styled('header')(({ theme }) => ({
    position: 'sticky',
    top: 0,
    zIndex: 100,
    height: HEADER_HEIGHT,
    minHeight: HEADER_HEIGHT,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
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
    textDecoration: 'none',
    '& img': {
        width: 24,
        height: 24,
        objectFit: 'contain',
    },
});

// Right container wrapper grouping actions
export const ActionsContainer = styled('nav')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
        gap: theme.spacing(4),
    },
}));

export const StyledIconButton = styled(IconButton)<NavLinkProps>(
    ({ theme }) => ({
        padding: theme.spacing(4),
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
    padding: theme.spacing(4),
    textAlign: 'center',
    minWidth: 250,
    gap: theme.spacing(4),
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
    width: 40,
    height: 40,
    boxShadow: theme.shadows[1],
}));
