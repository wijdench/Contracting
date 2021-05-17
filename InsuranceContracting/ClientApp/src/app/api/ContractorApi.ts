import getUrlControllerApi from '../utils/urlUtils'
import Contractor from '../models/Contractor';
import { responseToContractors } from '../transfer/ContractorAssembler';

const linkContractor = getUrlControllerApi('Contractor');

export default class ContractorApi {
    static addContractor(contractor : Contractor){
        return fetch(linkContractor, {
            headers: { 'content-type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(contractor),
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        });
    }

    static getContractors() : Promise<Contractor[]> {
        return fetch(linkContractor, {
            headers: { 'content-type': 'application/json' },
            method: 'GET',
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(responseToContractors);
    }
}