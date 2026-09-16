import {
    FieldPath,
    FieldValues,
    RegisterOptions,
    UseControllerProps,
} from 'react-hook-form';

import { TextFieldProps } from '@mui/material';

export type FormTextFieldProps<
    TFieldValues extends FieldValues,
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<UseControllerProps<TFieldValues, TFieldName>, 'rules'> & {
    rules?: RegisterOptions<TFieldValues, TFieldName>;
    // Type-safe onChange: It knows exactly what type the field should be
    onChange?: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => TFieldValues[TFieldName] | void;
} & Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'ref'>;
