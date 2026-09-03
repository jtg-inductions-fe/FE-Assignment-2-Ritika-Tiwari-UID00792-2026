import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Create a custom responsive wrapper around the MUI Container wrapper.
 */
export const StyledContainer = styled(Container)(({ theme }) => ({
    // Container styles for the mobile screens and up
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
        maxWidth: theme.breakpoints.up('sm'),
    },

    // Container styles for the tablet screens and up
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8),
        maxWidth: theme.breakpoints.up('md'),
    },

    // Container styles for desktop screens and up
    [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(16),
        maxWidth: theme.breakpoints.up('lg'),
    },
}));
