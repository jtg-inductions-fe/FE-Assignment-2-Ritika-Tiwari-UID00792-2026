import { Box, styled } from '@mui/material';

export const StyledBoxOuter = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    gap: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
    },
}));

export const StyledImage = styled('img')(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up('md')]: {
        width: '40%',
        maxWidth: 400,
        borderRadius: theme.shape.borderRadius,
        objectFit: 'cover',
        display: 'inline',
    },
}));
