import { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import ContactingForm from '../components/ContractingForm';
import ContractingChain from '../components/ContractingChain';
import ContractorApi from '../api/ContractorApi';
import ContractApi from '../api/ContractApi';
import Contractor from '../models/Contractor';

const ContractingChainContainer = (): JSX.Element => {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState<boolean>(true);
    const [contractors, setContractors] = useState<Contractor[]>([]);
    const [contractorsChain, setContractorsChain] = useState<Contractor[]>([]);

    useEffect(() => {
        ContractorApi.getContractors()
        .then(setContractors)
    }, []);


    const handleSubmit = (firstContractorId: string, secondContractorId: string) => {
        ContractApi.getShortestContractChain(firstContractorId, secondContractorId)
        .then(setContractorsChain)
        .then(() => setLoading(false))
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
                <Typography variant="h3">Shortest contracting chain</Typography>
            </Grid>
            <Grid item xs={6}>
                <ContactingForm  contractors={contractors} onSubmit={handleSubmit} />
            </Grid>
            <Grid item xs={6}>
                {!loading &&  <ContractingChain  contractorsChain={contractorsChain} /> }
            </Grid>

        </Grid>
    );
};

export default ContractingChainContainer;