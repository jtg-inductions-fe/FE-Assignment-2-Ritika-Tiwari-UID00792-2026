import Button from '@mui/material/Button';
import SnackbarContent from '@mui/material/SnackbarContent';
import { styled } from '@mui/material/styles';

// Custom button using theme's palette
export const StyledButton = styled(Button)(({ theme }) => ({
    boxShadow: theme.shadows[2],
    padding: theme.spacing(1, 3),
}));

// Custom snackbar wrapper addressing background and nested elements
export const ErrorSnackbarContent = styled(SnackbarContent)(({ theme }) => ({
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,

    // Clean trick: Inject your preset typography into the internal MUI text container
    '& .MuiSnackbarContent-message': {
        ...theme.typography.body2,
    },
}));
