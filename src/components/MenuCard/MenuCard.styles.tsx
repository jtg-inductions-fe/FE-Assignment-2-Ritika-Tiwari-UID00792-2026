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
    alignItems: 'center',
    minWidth: 220,
    maxWidth: 300,
    flexGrow: 1,
    width: '40%',
    boxShadow: theme.shadows[10],
    borderRadius: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        width: '100%',
        minWidth: '100%',
    },
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    minHeight: 200,
    borderRadius: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        width: '50%',
    },
})) as typeof CardMedia;

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
