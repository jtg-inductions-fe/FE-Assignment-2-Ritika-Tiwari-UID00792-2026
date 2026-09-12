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
    minWidth: 180,
    maxWidth: 300,
    flexGrow: 1,
    width: '40%',
    borderRadius: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        minWidth: 280,
        width: '30%',
    },
}));
export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    position: 'relative',
    paddingInline: 5,
    paddingTop: 5,
    minHeight: 200,
    borderRadius: theme.spacing(2),
})) as typeof CardMedia;

export const StyledImageIndicator = styled(CardMedia)({
    width: 20,
    height: 20,
    right: 20,
    top: 20,
    position: 'absolute',
}) as typeof CardMedia;
export const StyledClosedTag = styled(CardMedia)({
    width: 100,
    height: 100,
    right: 0,
    top: 0,
    position: 'absolute',
}) as typeof CardMedia;

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
