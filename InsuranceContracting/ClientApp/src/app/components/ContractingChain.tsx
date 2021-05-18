import { Typography } from '@material-ui/core';

export interface ContractingChainProps {
    contractorsChain: string[],
}

const ContractingChain: React.FC<ContractingChainProps> = ({ contractorsChain }: ContractingChainProps) => {
    return(
        <>
        <Typography variant="h5">Result:</Typography>
        <Typography variant="h6">{contractorsChain.length === 0 ? 'No contracting chain' : contractorsChain.join(" -- ")}</Typography>
        </>

    );

};

export default ContractingChain;