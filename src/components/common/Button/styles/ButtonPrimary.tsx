import { Button, styled } from '@mui/material';

/** Styled wrapper for the primary button used in the application. */
export const ButtonPrimary = styled(Button)(({ theme }) => ({
    boxShadow: theme.shadows[8],
    padding: theme.spacing(1, 3),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
    transition: 'transform 0.3s ease',
    // Handling the hover state of the button.
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        transform: 'translateY(2px)',
    },
}));
