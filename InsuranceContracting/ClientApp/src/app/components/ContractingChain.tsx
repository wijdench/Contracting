import { Typography } from '@material-ui/core';
import Contractor from '../models/Contractor';

export interface ContractingChainProps {
    contractorsChain: Contractor[],
}

const ContractingChain: React.FC<ContractingChainProps> = ({ contractorsChain }: ContractingChainProps) => {
    return(
        <>
        <Typography variant="h5">Result:</Typography>
        <Typography variant="h6">{contractorsChain.length === 0 ? 'No contracting chain' : contractorsChain.map(c => c.name).join(" -- ")}</Typography>
        </>

    );

};

export default ContractingChain;