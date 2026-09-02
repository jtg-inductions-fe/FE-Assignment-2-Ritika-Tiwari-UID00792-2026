/**
 * Types of props passed in Confirmation Dialog Component
 */
export interface ConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (value: boolean) => void;
    title: string;
    description: string;
}
