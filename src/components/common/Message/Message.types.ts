/**
 * Types of the props passed in Snackbar Message Component
 */
export interface MessageProps {
    message: string;
    state: 'success' | 'warning' | 'error';
}

/**
 * Types of the props passed for the Message Component state
 */
export interface StyledContentProps {
    $state: 'success' | 'warning' | 'error';
}
