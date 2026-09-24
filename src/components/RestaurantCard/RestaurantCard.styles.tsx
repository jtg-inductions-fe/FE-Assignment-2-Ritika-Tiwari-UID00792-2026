import StarIcon from '@mui/icons-material/Star';
import {
    Box,
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
    minWidth: 220,
    width: '40%',
    maxWidth: 300,
    flexGrow: 1,
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('sm')]: {
        maxWidth: 280,
    },
}));
export const StyledCardMedia = styled(CardMedia)<CardMediaProps<'img'>>(
    ({ theme }) => ({
        position: 'relative',
        height: 200,
        minHeight: 200,
        minWidth: 300,
        borderRadius: theme.shape.borderRadius,
        [theme.breakpoints.up('sm')]: {
            minWidth: 200,
        },
    }),
);

export const StyledImageIndicator = styled(CardMedia)<CardMediaProps<'img'>>({
    width: 20,
    height: 20,
    right: 20,
    top: 20,
    position: 'absolute',
});
export const StyledClosedTag = styled(CardMedia)<CardMediaProps<'img'>>({
    width: 100,
    height: 100,
    right: 0,
    top: 0,
    position: 'absolute',
});

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
    width: '100%',
    minHeight: 200,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
    ...theme.mixins.lineClamp(1),
}));
export const StyledDescription = styled(Typography)(({ theme }) => ({
    ...theme.mixins.lineClamp(2),
}));
export const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
});

export const StyledStarIcon = styled(StarIcon)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.primary.dark,
}));
