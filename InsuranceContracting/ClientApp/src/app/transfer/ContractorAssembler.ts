import Contractor, {HealthStatus, TypeContractor } from '../models/Contractor'

export interface ContractorResponse {
    id: string;
    name: string;
    address: string;
    phoneNumber: number | null;
    type: TypeContractor;
    healthStatus: HealthStatus;
}

export const responseToContractor = (contractor: ContractorResponse): Contractor => new Contractor({
    id: contractor.id,
    name: contractor.name,
    address: contractor.address,
    phoneNumber: contractor.phoneNumber,
    type: contractor.type,
    healthStatus: contractor.healthStatus,
});

export const responseToContractors = (contractors: ContractorResponse[]): Contractor[] => contractors.map(responseToContractor);