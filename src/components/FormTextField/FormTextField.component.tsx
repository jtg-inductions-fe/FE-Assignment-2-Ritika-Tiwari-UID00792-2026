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
    ...textFieldProps //Captures any remaining material ui standard input props passed to the component.
}: FormTextFieldProps<TFieldValues>) => {
    // useController wires up the field state automatically
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
            error={!!error}
            helperText={error ? error.message : textFieldProps.helperText}
            fullWidth
        />
    );
};
