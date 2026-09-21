import { Card, styled } from '@mui/material';

export const StyledRestaurantBanner = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    marginBlock: theme.spacing(8),
}));

export const StyledImage = styled('img')(({ theme }) => ({
    width: '100%',
    height: 300,
    borderRadius: theme.shape.borderRadius,
    objectFit: 'cover',
    objectPosition: 'center',
}));
