import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Create a custom responsive wrapper around the MUI Container wrapper.
 */
export const StyledContainer = styled(Container)(({ theme }) => ({
    // Container styles for the mobile screens and up
    [theme.breakpoints.up('sm')]: {
        paddingInline: theme.spacing(4),
        maxWidth: 600,
    },

    // Container styles for the tablet screens and up
    [theme.breakpoints.up('md')]: {
        paddingInline: theme.spacing(8),
        maxWidth: 900,
    },

    // Container styles for desktop screens and up
    [theme.breakpoints.up('lg')]: {
        paddingInline: theme.spacing(8),
        maxWidth: 1200,
    },
}));
