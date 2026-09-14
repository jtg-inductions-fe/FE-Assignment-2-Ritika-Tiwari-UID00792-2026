import { Control, UseFormHandleSubmit } from 'react-hook-form';

/**
 * Interface defining the configuration properties of the login form.
 */
export interface LoginFormData {
    /** Email of the user to login in application */
    email: string;
    /** Password of the user to login in application */
    password: string;
}

/**Interface defining the configuration properties, that needed to be passed to the login form */
export interface LoginFormProps {
    /** React form hook control object used to register managed inputs. */
    control: Control<LoginFormData>;
    /** Function to handle the form submission. */
    handleSubmit: UseFormHandleSubmit<LoginFormData>;
    /** indicated the form submitting state. */
    isSubmitting: boolean;
    /** Callback function to handle the submission login after the form validation. */
    onSubmit: (data: LoginFormData) => void;
    /** State to handle the password visibility state. */
    showPassword: boolean;
    /** Callback function to set the visibility state of the show password.  */
    handleClickShowPassword: () => void;
    /** State to handle the snackbar open state. */
    isSnackbarOpen: boolean;
    /** React state dispatcher to update the visibility status of the snackbar. */
    setIsSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    /** Store the message will be shown on the snackbar. */
    snackbarMessage: string;
}
