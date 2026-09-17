import { Card, styled, Typography } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
    ...theme.mixins.lineClamp(1),
}));
export const StyledDescription = styled(Typography)(({ theme }) => ({
    ...theme.mixins.lineClamp(2),
}));
