import Contract from '../models/Contract'

export interface ContractResponse {
    firstContractorId: string;
    secondContractorId: string;
}

export const responseToContract = (contract: ContractResponse): Contract => new Contract({
    firstContractorId: contract.firstContractorId,
    secondContractorId: contract.secondContractorId,
});

export const responseToContracts = (contractors: ContractResponse[]): Contract[] => contractors.map(responseToContract);