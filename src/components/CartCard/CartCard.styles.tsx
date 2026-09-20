import { Box, Card, styled, Typography } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
    width: '100%',
    position: 'relative',
    display: 'flex',
    boxSizing: 'border-box',
    flexDirection: 'row',
    alignItems: 'start',
    gap: theme.spacing(4),
    padding: theme.spacing(2),
    justifyContent: 'space-between',
    [theme.breakpoints.up('lg')]: {
        width: '45%',
    },
}));

export const ItemDetailsGroup = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyItems: 'space-between',
    gap: theme.spacing(2),
    flexShrink: 0,
}));

export const InteractiveControlsGroup = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'end',
    gap: theme.spacing(3),
    flexWrap: 'wrap',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        gap: theme.spacing(1),
    },
}));

export const PriceWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
});
export const StyledTitle = styled(Typography)(({ theme }) => ({
    maxWidth: 150,

    [theme.breakpoints.up('sm')]: {
        maxWidth: '100%',
    },
}));
