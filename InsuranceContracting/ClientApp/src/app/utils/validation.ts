
const isFieldEmpty = ( value : unknown ): boolean => {
    if (!value || ( typeof value === 'string' && value.trim().length === 0 )) {
        return true;
    }

    return false;
}

const resultValidation = ( value: unknown) : string | void => {
    if(isFieldEmpty(value)){
        return 'Required';
    }
}

export const validationRequired = (): any => resultValidation;

