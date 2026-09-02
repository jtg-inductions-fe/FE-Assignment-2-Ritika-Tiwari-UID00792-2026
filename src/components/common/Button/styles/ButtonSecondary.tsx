import { Button, styled } from '@mui/material';

export const ButtonSecondary = styled(Button)(({ theme }) => ({
    boxShadow: theme.shadows[2],
    padding: theme.spacing(1, 3),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'translateY(2px)',
    },
}));
