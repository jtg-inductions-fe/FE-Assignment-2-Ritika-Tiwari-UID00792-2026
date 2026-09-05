/**
 * Interface defining the configuration and callback properties of the confirmation dialog.
 */
export interface ConfirmationDialogProps {
    /**Controls the visibility state of the confirmation dialog modal. */
    open: boolean;
    /** Callback function triggers when the requests to close or cancel the dialog. */
    onClose: () => void;
    /** Callback function triggers when user successfully confirms the action. */
    onSubmit: (value: boolean) => void;
    /** Title shown on the confirmation dialog. */
    title: string;
    /** Description body guides the user on what action they are confirming. */
    description: string;
}
