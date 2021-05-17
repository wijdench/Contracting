import { Formik } from 'formik';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Contractor from '../models/Contractor';

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      minWidth: 300,
    },
  }),
);

export interface ContractorFormProps {
    contractors: Contractor[],
    onSubmit: (firstContractorId: string, secondContractorId: string) => void
}

const ContractingForm: React.FC<ContractorFormProps> = ({ contractors, onSubmit }: ContractorFormProps) => {
    const classes = useStyles();

    const submit = (data: { firstContractorId: string, secondContractorId: string }) => {

        onSubmit(data.firstContractorId, data.secondContractorId);
    }
    return (
        <Formik
            initialValues={{ firstContractorId: '' , secondContractorId: '' }}
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
                    onSubmit={handleSubmit}
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <FormControl fullWidth size='small' variant='outlined' className={classes.form}>
                            <InputLabel id='type'>Contractor</InputLabel>
                            <Select
                                label='First contractor'
                                labelId='firstContractor'
                                name='firstContractor'
                                onChange={event => setFieldValue('firstContractorId', event.target.value)}
                                value={values.firstContractorId}
                            >
                                {contractors.map(contractor => (
                                    <MenuItem key={contractor.id} value={contractor.id}>
                                        {contractor.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth size='small' variant='outlined' className={classes.form}>
                            <InputLabel id='type'>Contractor</InputLabel>
                            <Select
                                label='Second contractor'
                                labelId='secondContractor'
                                onChange={event => setFieldValue('secondContractorId', event.target.value)}
                                value={values.secondContractorId}
                            >
                                {contractors.map(contractor => (
                                    <MenuItem key={contractor.id} value={contractor.id}>
                                        {contractor.name}
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

export default ContractingForm;