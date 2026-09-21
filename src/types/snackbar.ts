// Define the allowed variants
export type SnackbarVariant = 'success' | 'error' | 'warning' | 'info';

// Define the interface for the snackbar state
export interface SnackbarConfig {
    open: boolean;
    message: string;
    variant: SnackbarVariant;
}
