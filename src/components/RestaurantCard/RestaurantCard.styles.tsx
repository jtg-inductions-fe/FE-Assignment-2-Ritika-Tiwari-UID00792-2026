import { Card, CardContent, CardMedia, styled } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
    width: '45%',
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(2),
}));
export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    paddingInline: 5,
    paddingTop: 5,
    borderRadius: theme.spacing(2),
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
    width: '100%',
    backgroundColor: theme.palette.background.default,
}));
