import { Box, Card, styled } from '@mui/material';

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

export const OuterContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    gap: theme.spacing(4),
    marginBlock: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    },
}));

export const FilterContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    gap: theme.spacing(4),
}));
