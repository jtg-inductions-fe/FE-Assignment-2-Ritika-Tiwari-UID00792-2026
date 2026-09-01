/**
 * Types for the props of Confirmation Dialog Component
 */
export interface ConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (value: boolean) => void;
    title?: string;
    description?: string;
}
