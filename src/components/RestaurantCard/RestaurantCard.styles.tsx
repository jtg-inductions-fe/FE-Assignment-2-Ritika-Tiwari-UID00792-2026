import {
    Card,
    CardContent,
    CardMedia,
    styled,
    Typography,
} from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    maxWidth: 345,
    width: '40%',
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(2),
}));
export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    position: 'relative',
    paddingInline: 5,
    paddingTop: 5,
    borderRadius: theme.spacing(2),
}));

export const StyledImageIndicator = styled(CardMedia)({
    width: 20,
    height: 20,
    right: 20,
    top: 20,
    position: 'absolute',
});

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
    width: '100%',
    backgroundColor: theme.palette.background.default,
}));

export const StyledDescription = styled(Typography)(({ theme }) => ({
    ...theme.mixins.lineClamp(2),
}));
