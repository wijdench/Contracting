interface IContract {
    firstContractorId: string;
    secondContractorId: string;
}

export default class Contract
    implements IContract {
        readonly firstContractorId: string;
        readonly secondContractorId: string;
        constructor({
            firstContractorId = '',
            secondContractorId = '',
        }: Partial<IContract> = {}) {

            this.firstContractorId = firstContractorId;
            this.secondContractorId = secondContractorId;
        }
    }