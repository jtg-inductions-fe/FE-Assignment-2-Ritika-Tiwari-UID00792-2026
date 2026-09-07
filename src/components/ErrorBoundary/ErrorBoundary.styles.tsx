import { Box, styled } from '@mui/material';

/**
 * Styled Paper container that serves as the main structural box for the error screen.
 */
export const ErrorContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: theme.palette.error.light,
    border: `1px solid ${theme.palette.error.main}`,
    borderRadius: theme.shape.borderRadius,
}));

/**
 * Container box used to wrap and align structural action items like buttons.
 */
export const ActionWrapper = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    display: 'flex',
    gap: theme.spacing(1),
}));
