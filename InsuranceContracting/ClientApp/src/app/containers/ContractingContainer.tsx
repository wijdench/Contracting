import { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import ContactingForm from '../components/ContractingForm';
import ContractApi from '../api/ContractApi';
import ContractorApi from '../api/ContractorApi';
import Contractor from '../models/Contractor';
import Contract from '../models/Contract';

const ContractingContainer = (): JSX.Element => {
    const { enqueueSnackbar } = useSnackbar();
    const [contractors, setContractors] = useState<Contractor[]>([]);

    useEffect(() => {
        ContractorApi.getContractors()
        .then(setContractors);
    }, []);

    const handleSubmit = (firstContractorId: string, secondContractorId: string) => {
        const contract = new Contract({ firstContractorId: firstContractorId, secondContractorId: secondContractorId});
        
        ContractApi.addContract(contract)
        .then(() => enqueueSnackbar('Contract saved successfully', { variant: 'success' }))
        .catch(() => enqueueSnackbar('Failed to save contract', { variant: 'error' }));
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
                <Typography variant="h3">Create Contract</Typography>
            </Grid>
            <Grid item xs={6}>
                <ContactingForm  contractors={contractors} onSubmit={handleSubmit} />
            </Grid>

        </Grid>
    );
};

export default ContractingContainer;