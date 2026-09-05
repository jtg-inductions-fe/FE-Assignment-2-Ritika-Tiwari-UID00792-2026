import { Link } from 'react-router-dom';

import { Box, styled } from '@mui/material';

export const StyledBoxOuter = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    mx: 'auto',
    gap: '2rem',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '20px',
    boxShadow: theme.shadows[4],
    padding: 64,
    [theme.breakpoints.down('md')]: {
        padding: 0,
    },
}));
export const StyledBoxInner = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '20px',
    padding: 24,
}));
/** Styling of image component used in the fallback page. */
export const LogoImage = styled('img')(({ theme }) => ({
    width: '32px',
    height: 'auto',
    borderRadius: theme.shape.borderRadius,
    objectFit: 'cover',
}));
/** Styling of image component used in the fallback page. */
export const StyledImage = styled('img')(({ theme }) => ({
    width: '40%',
    maxWidth: '400px',
    height: 'auto',
    borderRadius: theme.shape.borderRadius,
    objectFit: 'cover',

    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));
export const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    textAlign: 'center',
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
