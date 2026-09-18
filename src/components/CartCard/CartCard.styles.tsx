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
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(3),

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

export const StyledTitle = styled(Typography)({
    width: 100,
    textAlign: 'center',
});
