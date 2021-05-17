import { Formik } from 'formik';
import { Button, Grid, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Contractor, { HealthStatus, HealthStatusEmojis, TypeContractor } from '../models/Contractor';
import FormikTextField from './FormikTextField';
import FormikPhoneField from './FormikPhoneField';
import { validationRequired } from '../utils/validation';

export interface ContractorFormProps {
    onSubmit:(contractor: Contractor) => void
}

const ContractorForm: React.FC<ContractorFormProps> = ({ onSubmit}: ContractorFormProps) => {

    const submit = (data: any) => {
        const newContractor = new Contractor({
            id: data.id,
            name: data.name,
            address: data.address,
            phoneNumber: data.phoneNumber ? parseInt(data.phoneNumber) : null,
            type: data.type,
            healthStatus: data.healthStatus,
        });

        onSubmit(newContractor);
    }

    return (
        <Formik
            initialValues={new Contractor()}
            onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                submit(data);
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, values, handleSubmit, setFieldValue }) => (
                <Grid
                    alignItems='center'
                    component='form'
                    container
                    justify='flex-end'
                    noValidate
                    onSubmit={handleSubmit}
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <FormikTextField
                            fullWidth
                            label='Name'
                            name='name'
                            required
                            size='small'
                            validate={validationRequired()}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormikTextField
                            fullWidth
                            label='Address'
                            name='address'
                            required
                            size='small'
                            validate={validationRequired()}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormikPhoneField
                            fullWidth
                            label='Phone number'
                            name='phoneNumber'
                            required
                            size='small'
                            validate={validationRequired()}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth size='small' variant='outlined'>
                            <InputLabel id='type'>Type</InputLabel>
                            <Select
                                label='Type'
                                labelId='type'
                                onChange={event => setFieldValue('type', event.target.value)}
                                value={values.type}
                            >
                                {Object.keys(TypeContractor).filter(c => !(parseInt(c) >= 0)).map((type: any) => (
                                    <MenuItem key={type} value={TypeContractor[type]}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl fullWidth size='small' variant='outlined'>
                            <InputLabel id='healthStatus'>Health status</InputLabel>
                            <Select
                                label='Health status'
                                labelId='healthStatus'
                                onChange={event => setFieldValue('healthStatus', event.target.value)}
                                value={values.healthStatus}
                            >
                                {Object.keys(HealthStatus).filter(x => !(parseInt(x) >= 0)).map((HealthStatusKey : any, value: any) => (
                                    <MenuItem key={HealthStatusKey} value={HealthStatus[HealthStatusKey]}>
                                        {HealthStatusEmojis[value]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button
                            color='primary'
                            disabled={isSubmitting}
                            type='submit'
                            variant='contained'
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Formik>
    );
};

export default ContractorForm;