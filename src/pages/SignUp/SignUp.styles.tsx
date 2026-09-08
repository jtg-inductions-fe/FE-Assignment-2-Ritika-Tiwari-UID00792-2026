import { Box, styled, TextField } from '@mui/material';

export const StyledBoxOuter = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 20,
    boxShadow: theme.shadows[4],
    padding: theme.spacing(0),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
    },
}));
export const StyledBoxInner = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 20,
    padding: 24,
}));

export const LogoImage = styled('img')(({ theme }) => ({
    width: 32,
    height: 'auto',
    borderRadius: theme.shape.borderRadius,
    objectFit: 'cover',
}));

export const StyledImage = styled('img')(({ theme }) => ({
    width: '40%',
    maxWidth: 400,
    height: 'auto',
    borderRadius: theme.shape.borderRadius,
    objectFit: 'cover',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));
export const StyledTextField = styled(TextField)({
    width: '100%',
    maxWidth: 400,
});
