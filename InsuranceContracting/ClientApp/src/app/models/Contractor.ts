export enum HealthStatus
{
    Green,
    Yellow,
    Red,
}

export const HealthStatusEmojis = ['🟢', '🟡', '🔴'];

export enum TypeContractor
{
    Carrier,
    MGA,
    Advisor
}

interface IContractor {
    id: string;
    name: string;
    address: string;
    phoneNumber: number | null;
    type: TypeContractor;
    healthStatus: HealthStatus;
}

let temporaryId = 0;

export default class Contractor
    implements IContractor {
        readonly id: string;
        readonly name: string;
        readonly address: string;
        readonly phoneNumber: number | null;
        readonly type: TypeContractor;
        readonly healthStatus: HealthStatus;

        constructor({
            id = (temporaryId += 1).toString(),
            name = '',
            address = '',
            phoneNumber = null,
            type = TypeContractor.Carrier,
            healthStatus = HealthStatus.Green,
        }: Partial<IContractor> = {}) {

            this.id = id;
            this.name = name;
            this.address = address;
            this.phoneNumber = phoneNumber;
            this.type = type;
            this.healthStatus = healthStatus;
        }
    }