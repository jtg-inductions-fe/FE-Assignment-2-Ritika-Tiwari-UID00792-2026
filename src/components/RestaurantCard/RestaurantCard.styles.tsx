import {
    Card,
    CardContent,
    CardMedia,
    CardMediaProps,
    styled,
    Typography,
} from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(8),
    maxWidth: 200,
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('sm')]: {
        maxWidth: 240,
    },
}));
export const StyledCardMedia = styled(CardMedia)<CardMediaProps>(({ theme }) => ({
    position: 'relative',
    height: 200,
    minHeight: 200,
    borderRadius: theme.shape.borderRadius,
}));

export const StyledImageIndicator = styled(CardMedia)<CardMediaProps>({
    width: 20,
    height: 20,
    right: 20,
    top: 20,
    position: 'absolute',
});
export const StyledClosedTag = styled(CardMedia)<CardMediaProps>({
    width: 100,
    height: 100,
    right: 0,
    top: 0,
    position: 'absolute',
});

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
    width: '100%',
    backgroundColor: theme.palette.background.default,
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
    ...theme.mixins.lineClamp(1),
}));
export const StyledDescription = styled(Typography)(({ theme }) => ({
    ...theme.mixins.lineClamp(2),
}));
