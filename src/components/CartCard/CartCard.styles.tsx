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

    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(2.5),
        paddingRight: theme.spacing(6),
    },
}));
export const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    boxSizing: 'border-box',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing(4),
        padding: theme.spacing(2.5),
    },
}));

export const ItemDetailsGroup = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyItems: 'space-between',
    gap: theme.spacing(4),
    flexShrink: 0,
}));

export const InteractiveControlsGroup = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),

    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing(3),
    },
}));

export const PriceDisplayWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
});

export const StyledTitle = styled(Typography)({
    width: 100,
    textAlign: 'center',
});
