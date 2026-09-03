import { Button, styled } from '@mui/material';

/**
 * Styles Button Wrapper for the secondary button used in the application.
 */
export const ButtonSecondary = styled(Button)(({ theme }) => ({
    boxShadow: theme.shadows[8],
    padding: theme.spacing(1, 3),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    transition: 'transform 0.3s ease',
    // Handling the hover state of the button.
    '&:hover': {
        transform: 'translateY(2px)',
    },
}));
