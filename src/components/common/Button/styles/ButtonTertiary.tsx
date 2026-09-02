import { Button, styled } from '@mui/material';

export const ButtonTertiary = styled(Button)(({ theme }) => ({
    boxShadow: theme.shadows[2],
    padding: theme.spacing(1, 3),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    transition: 'transform 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        transform: 'translateY(2px)',
    },
}));
