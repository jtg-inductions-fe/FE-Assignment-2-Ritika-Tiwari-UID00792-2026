import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Create a custom responsive wrapper around the MUI Container
 */
export const StyledContainer = styled(Container)(({ theme }) => ({
    // Container for the mobile screens
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
        maxWidth: theme.breakpoints.up('sm'),
    },

    // Container for the tablet screens
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8),
        maxWidth: theme.breakpoints.up('md'),
    },

    // Container for the desktop screens
    [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(16),
        maxWidth: theme.breakpoints.up('lg'),
    },
}));
