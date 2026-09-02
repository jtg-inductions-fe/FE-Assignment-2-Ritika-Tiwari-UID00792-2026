import { Button, styled } from '@mui/material';

export const ButtonPrimary = styled(Button)(({ theme }) => ({
    boxShadow: theme.shadows[2],
    padding: theme.spacing(1, 3),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    transition: 'transform 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main,
        transform: 'translateY(2px)',
    },
}));
