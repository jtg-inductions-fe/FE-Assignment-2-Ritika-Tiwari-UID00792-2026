/**
 * Types for the props of Snackbar Message Component
 */
export interface MessageProps {
    message: string;
    state: 'success' | 'warning' | 'error';
}

/**
 * Types for the props of Message Component state
 */
export interface StyledContentProps {
    $state: 'success' | 'warning' | 'error';
}
