import { Box, styled } from '@mui/material';

export const StyledBoxOuter = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[4],
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
    },
}));
export const StyledBoxInner = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    padding: 24,
}));

export const LogoImage = styled('img')(({ theme }) => ({
    width: 32,
    height: 32,
    borderRadius: theme.shape.borderRadius,
    objectFit: 'cover',
}));

export const StyledImage = styled('img')(({ theme }) => ({
    display: 'none',
    width: '40%',
    maxWidth: 400,
    borderRadius: theme.shape.borderRadius,
    objectFit: 'cover',
    [theme.breakpoints.up('md')]: {
        display: 'inline',
    },
}));
