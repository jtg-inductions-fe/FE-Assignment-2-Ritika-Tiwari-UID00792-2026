import {
    Card,
    CardContent,
    CardMedia,
    styled,
    Typography,
} from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    alignItems: 'center',
    minWidth: 220,
    width: '40%',
    maxWidth: 300,
    flexGrow: 1,
    padding: theme.spacing(4),
    boxShadow: theme.shadows[10],
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        minWidth: '100%',
    },
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    minHeight: 200,
    borderRadius: theme.shape.borderRadius,
    objectFit: 'cover',
    [theme.breakpoints.up('md')]: {
        minHeight: 250,
        width: '50%',
    },
})) as typeof CardMedia;

export const StyledImageIndicator = styled(CardMedia)({
    width: 20,
    height: 20,
    right: 30,
    top: 30,
    position: 'absolute',
}) as typeof CardMedia;

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
