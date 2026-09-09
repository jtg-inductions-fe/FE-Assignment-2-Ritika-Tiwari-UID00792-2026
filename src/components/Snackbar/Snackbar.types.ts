/**
 * Types of the props passed in Snackbar Message Component
 */
export interface SnackbarProps {
    /**Controls the visibility state of the snackbar. */
    open: boolean;
    /**Optional duration overrides in milliseconds before self-hiding */
    autoHideDuration?: number;
    /** Callback function triggers when the requests to close the snackbar. */
    onClose: () => void;
    /** Message displayed in the snackbar */
    message: string;
    /** State variable defines the state of the snackbar based on this the color of the snackbar will change. */
    state: 'success' | 'warning' | 'error';
}
