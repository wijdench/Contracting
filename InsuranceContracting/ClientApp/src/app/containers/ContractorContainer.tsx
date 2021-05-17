import { Grid, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import ContactorForm from '../components/ContractorForm';
import ContractorApi from '../api/ContractorApi';
import Contractor from '../models/Contractor';

const ContractorContainer = (): JSX.Element => {
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = (contractor: Contractor) => {
        ContractorApi.addContractor(contractor)
            .then(() => enqueueSnackbar('Contractor saved successfully', { variant: 'success' }))
            .catch(() => enqueueSnackbar('Failed to save contractor', { variant: 'error' }));
    }

    return (
        <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={6}>
                <Typography variant="h3">Add Contractor</Typography>
            </Grid>
            <Grid item xs={6}>
                <ContactorForm onSubmit={handleSubmit} />
            </Grid>

        </Grid>
    );
};

export default ContractorContainer;