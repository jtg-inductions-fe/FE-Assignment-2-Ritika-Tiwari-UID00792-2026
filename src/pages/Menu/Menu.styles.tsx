import { Box, CardContent, styled } from '@mui/material';

export const StyledRestaurantBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    marginBlock: theme.spacing(3.2),
}));

export const StyledImage = styled('img')(({ theme }) => ({
    width: '100%',
    height: 300,
    borderRadius: theme.shape.borderRadius,
    objectFit: 'cover',
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: theme.spacing(2),
}));
