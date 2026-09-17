import { Box, Card, CardContent, styled, Typography } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    border: `1px solid ${theme.palette.divider}`,
    gap: theme.spacing(4),
    padding: theme.spacing(4),
}));

export const StyledBox = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    padding: theme.spacing(4),
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('md')]: {
        width: '50%',
    },
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
    ...theme.mixins.lineClamp(1),
}));
export const StyledDescription = styled(Typography)(({ theme }) => ({
    ...theme.mixins.lineClamp(2),
}));
