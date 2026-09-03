import { Box, Paper, styled } from '@mui/material';

/**
 * Styled Paper container that serves as the main structural box for the error screen.
 * @component
 */
export const ErrorContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    margin: theme.spacing(2, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: theme.palette.error.light,
    border: `1px solid ${theme.palette.error.main}`,
    borderRadius: theme.shape.borderRadius * 2,
}));

/**
 * Container box used to wrap and align structural action items like buttons.
 * @component
 */
export const ActionWrapper = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2),
    display: 'flex',
    gap: theme.spacing(1),
}));
