import { FieldConfig, useField } from 'formik';
import {TextField, TextFieldProps } from '@material-ui/core';

export type FormikTextFieldProps = {
    name: string,
    validate?: (value: string) => ReturnType<NonNullable<FieldConfig['validate']>>
} & TextFieldProps

const FormikTextField: React.FC<FormikTextFieldProps> = ({ name, validate, ...props}: FormikTextFieldProps) => {
    const [field, meta] = useField<string>({ name, validate});

    return (
        <TextField
            error={meta.touched && !!meta.error}
            helperText={meta.touched ? meta.error : ''}
            id={field.name}
            name={field.name}
            onBlur={field.onBlur}
            onChange={field.onChange}
            value={field.value}
            variant='outlined'
            {...props}
        />
    );
};

export default FormikTextField;