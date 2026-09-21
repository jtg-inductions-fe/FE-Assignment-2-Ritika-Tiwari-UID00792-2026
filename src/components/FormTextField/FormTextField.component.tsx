import { FieldValues, useController } from 'react-hook-form';

import { TextField } from '@mui/material';

import { FormTextFieldProps } from './FormTextField.types';

/** Reusable form controlled component
 * Integrates material ui's textfield wrapper with react form hook via useController hook.
 *
 * @template TFieldValues - Extends standard form field schemas and values.
 */
export const FormTextField = <TFieldValues extends FieldValues>({
    name,
    control,
    rules,
    defaultValue,
    onChange: externalOnChange,
    ...textFieldProps
}: FormTextFieldProps<TFieldValues>) => {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
        rules,
        defaultValue,
    });

    return (
        <TextField
            {...textFieldProps}
            {...field}
            // Intercept and safely run both standard and external onChange logic
            onChange={(e) => {
                if (externalOnChange) {
                    // Let the external handler transform or manage the value
                    const processedValue = externalOnChange(e);
                    // Pass the processed result back to React Hook Form
                    field.onChange(
                        processedValue !== undefined ? processedValue : e,
                    );
                } else {
                    field.onChange(e);
                }
            }}
            error={!!error}
            helperText={error ? error.message : textFieldProps.helperText}
            fullWidth
        />
    );
};
