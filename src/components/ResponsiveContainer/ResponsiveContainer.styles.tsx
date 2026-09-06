import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MAX_WIDTH_LG, MAX_WIDTH_MD, MAX_WIDTH_SM, MAX_WIDTH_XL } from './ResponsiveContainer.constants';

/**
 * Create a custom responsive wrapper around the MUI Container wrapper.
 */
export const StyledContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(1.6),

    // Container styles for the mobile screens and up
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(1.6),
        maxWidth: MAX_WIDTH_SM,
    },

    // Container styles for the tablet screens and up
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(2.4),
        maxWidth: MAX_WIDTH_MD,
    },

    // Container styles for desktop screens and up
    [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(3.2),
        maxWidth: MAX_WIDTH_LG,
    },

    // Container styles for Large desktop screens and up
    [theme.breakpoints.up('xl')]: {
        padding: theme.spacing(6.4),
        maxWidth: MAX_WIDTH_XL,
    },
}));
