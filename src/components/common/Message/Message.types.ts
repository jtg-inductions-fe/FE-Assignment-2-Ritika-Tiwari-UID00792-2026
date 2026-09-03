/**
 * Types of the props passed in Snackbar Message Component
 */
export interface MessageProps {
    /** Message displayed in the snackbar */
    message: string;
    /** State variable defines the state of the snackbar based on this the color of the snackbar will change. */
    state: 'success' | 'warning' | 'error';
}

/**
 * Types of the props passed for the Message Component state
 */
export interface StyledContentProps {
    $state: 'success' | 'warning' | 'error';
}
