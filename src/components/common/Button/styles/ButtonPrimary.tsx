import { Button, styled } from '@mui/material';

export const ButtonPrimary = styled(Button)(({ theme }) => ({
    boxShadow: theme.shadows[2],
    padding: theme.spacing(1, 3),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.primary,
    transition: 'transform 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        transform: 'translateY(2px)',
    },
}));
