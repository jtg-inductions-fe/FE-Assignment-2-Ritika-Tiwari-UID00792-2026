import { SetStateAction } from 'react';

import { Control, UseFormHandleSubmit } from 'react-hook-form';

import { SnackbarConfig } from '@types';

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
    /**State to manage the configuration (visibility,message and state) of the snackbar. */
    snackbarConfig: SnackbarConfig;
    /** Callback function to set the state of the snackbar. */
    setSnackbarConfig: React.Dispatch<SetStateAction<SnackbarConfig>>;
}
