import { Control, UseFormHandleSubmit } from 'react-hook-form';

/**
 * Interface defining the configuration properties of the SignUp form.
 */
export interface SignUpFormData {
    /** Unique id for the each user */
    id: string;
    /** Role of the user (customer or owner)*/
    role: UserRole;
    /** Name of the user  */
    name: string;
    /** Email of the user */
    email: string;
    /** Password for the user login */
    password: string;
    /** Confirmation password field for to confirm the password */
    confirmPassword?: string;
}

/**
 * Types for the user role
 */
export type UserRole = 'customer' | 'owner';

/**Interface defining the configuration properties, that needed to be passed to the SignUp form */
export interface SignUpFormProps {
    /** React form hook control object used to register managed inputs. */
    control: Control<SignUpFormData>;
    /** Function to handle the form submission. */
    handleSubmit: UseFormHandleSubmit<SignUpFormData>;
    /** indicated the form submitting state. */
    isSubmitting: boolean;
    /** Callback function to handle the submission login after the form validation. */
    onSubmit: (data: SignUpFormData) => void;
    /**The currently typed  password value used to dynamically match validation state. */
    watchPassword: string;
    /** State to handle the password visibility state. */
    showPassword: boolean;
    /** Callback function to set the visibility state of the show password.  */
    handleClickShowPassword: () => void;
    /** State to handle the password visibility state. */
    showConfirmPassword: boolean;
    /** Callback function to set the visibility state of the show confirm password. */
    handleClickShowConfirmPassword: () => void;
    /** State to handle the snackbar open state. */
    isSnackbarOpen: boolean;
    /** React state dispatcher to update the visibility status of the snackbar. */
    setIsSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    /** Store the message will be shown on the snackbar. */
    snackbarMessage: string;
}
