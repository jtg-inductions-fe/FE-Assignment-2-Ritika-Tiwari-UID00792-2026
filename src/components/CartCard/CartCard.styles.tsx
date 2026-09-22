import { Box, Card, styled, Typography } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
    width: '100%',
    position: 'relative',
    display: 'flex',
    boxSizing: 'border-box',
    flexDirection: 'row',
    gap: theme.spacing(4),
    padding: theme.spacing(2),
    justifyContent: 'space-between',
    [theme.breakpoints.up('lg')]: {
        width: '45%',
    },
}));

export const StyledImage = styled('img')(({ theme }) => ({
    width: 20,
    height: 20,
    objectFit: 'cover',
    backgroundColor: theme.palette.background.default,
}));

export const ItemDetailsGroup = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyItems: 'space-between',
    gap: theme.spacing(2),
    flexShrink: 0,
}));

export const InteractiveControlsGroup = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 100,
    gap: theme.spacing(4),
    flexWrap: 'wrap',
    [theme.breakpoints.up('sm')]: {
        minWidth: 150,
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
    maxWidth: 150,
    wordBreak: 'break-word',
    whiteSpace: 'normal',
    overflowWrap: 'anywhere',
});
