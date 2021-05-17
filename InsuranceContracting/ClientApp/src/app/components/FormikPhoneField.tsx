import { FieldConfig, useField } from 'formik';
import {TextField, TextFieldProps } from '@material-ui/core';

export type FormikPhoneFieldProps = {
    name: string,
    validate?: (value: string) => ReturnType<NonNullable<FieldConfig['validate']>>
} & TextFieldProps

const FormikPhoneField: React.FC<FormikPhoneFieldProps> = ({ name, validate, ...props}: FormikPhoneFieldProps) => {
    const [field, meta] = useField<string>({ 
        name, 
        validate: (phone: string) => {
            if(phone && phone.length !== 10 && !/^([0-9]{3}-[0-9]{3}-[0-9]{4})$/.test(phone)) {
                return 'Invalid phone number';
            }

            if(validate) {
                return validate(phone);
            }
        },
    });

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

export default FormikPhoneField;