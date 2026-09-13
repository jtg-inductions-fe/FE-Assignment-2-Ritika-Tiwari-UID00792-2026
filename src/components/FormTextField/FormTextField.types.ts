import { TextFieldProps } from '@mui/material';
import {
    FieldPath,
    FieldValues,
    RegisterOptions,
    UseControllerProps,
} from 'react-hook-form';

// This is a custom type template. It creates a rulebook for our text box.
// It joins React Hook Form controls and Material-UI design settings together.
export type FormTextFieldProps<TFieldValues extends FieldValues> =
    // Take all standard React Hook Form settings, but remove the default 'rules' so we can rewrite it below.
    Omit<UseControllerProps<TFieldValues>, 'rules'> & {
        // This lets us add validation rules, like making a field required.
        rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
    } /* Take all standard Material-UI design settings, but remove 'name', 'value', 'onChange', 'onBlur', and 'ref'.
  We remove them because React Hook Form will manage these automatically!*/ & Omit<
            TextFieldProps,
            'name' | 'value' | 'onChange' | 'onBlur' | 'ref'
        >;
