import getUrlControllerApi from '../utils/urlUtils';
import Contract from '../models/Contract';

const linkContractor = getUrlControllerApi('Contract');

export default class ContractApi {
    static addContract(contract : Contract){
        return fetch(linkContractor, {
            headers: { 'content-type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(contract),
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        });
    } 

    static getShortestContractChain(firstContractorId : string, secondContractorId: string) : Promise<string[]> {
        const params = new URLSearchParams({
            firstContractorId: firstContractorId,
            secondContractorId: secondContractorId,
        });

        return fetch(`${linkContractor}/shortestContractChain?${params}`, {
            method: 'GET',
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json());
    }
}