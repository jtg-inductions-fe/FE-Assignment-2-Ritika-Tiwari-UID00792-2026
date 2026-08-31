export default interface ConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (value: boolean) => void;
    title?: string;
    description?: string;
}
