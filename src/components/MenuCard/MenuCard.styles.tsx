import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    styled,
    Typography,
} from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    minWidth: 180,
    maxWidth: 300,
    flexGrow: 1,
    width: '40%',
    borderRadius: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        width: '100%',
        minWidth: '100%',
    },
}));
export const StyledCardActionArea = styled(CardActionArea)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        paddingBlock: theme.spacing(2.4),
    },
}));
export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    minHeight: 200,
    borderRadius: theme.spacing(2),
})) as typeof CardMedia;

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
    width: '100%',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('md')]: {
        paddingBlock: 0,
    },
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
    ...theme.mixins.lineClamp(1),
}));
export const StyledDescription = styled(Typography)(({ theme }) => ({
    ...theme.mixins.lineClamp(2),
}));
