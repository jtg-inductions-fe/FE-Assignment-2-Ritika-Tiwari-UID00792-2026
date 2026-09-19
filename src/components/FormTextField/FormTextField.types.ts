import {
    FieldPath,
    FieldValues,
    RegisterOptions,
    UseControllerProps,
} from 'react-hook-form';

import { TextFieldProps } from '@mui/material';

// Define a custom type for a Form Text Field component.
export type FormTextFieldProps<
    // 'TFieldValues' represents the shape of your entire form data (example { username: "", email: "" })
    TFieldValues extends FieldValues,
    // 'TFieldName' is the specific field name/path (e.g., "username").
    // It defaults to any valid path inside your form data.
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> =
    // Take all standard properties needed for a form controller
    Omit<UseControllerProps<TFieldValues, TFieldName>, 'rules'> & {
        // but make the validation 'rules' optional and tie them to this specific field type.
        rules?: RegisterOptions<TFieldValues, TFieldName>;

        // Define a custom 'onChange' function.
        // It captures standard input/textarea change events and can optionally return the field's new value.
        onChange?: (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => TFieldValues[TFieldName] | void;
    } & Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'ref'>; // react-hook-form will handle those behind the scenes. // We explicitly remove ('Omit') 'name', 'value', 'onChange', 'onBlur', and 'ref' because // Finally, bring in all standard Text Field UI styling properties (like 'label', 'variant', 'placeholder').
