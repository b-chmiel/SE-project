import axios from 'axios';
import {ApiRoutes, API_BASE_PATH} from '../../../routing/routes';
import {Visit, VisitToPost} from './visitAPI.types';

export function getVisits(): Promise<Visit[] | null> {
    return axios
        .get(API_BASE_PATH + ApiRoutes.VISITS, {
            headers: {
                Guid: localStorage.getItem('client_uuid'),
            },
        })
        .then((response) => response.data)
        .catch(() => null);
}

export function getVisit(visitId: number): Promise<Visit | null> {
    return axios
        .get(`${API_BASE_PATH}${ApiRoutes.VISITS}/${visitId}`, {
            headers: {
                Guid: localStorage.getItem('client_uuid'),
            },
        })
        .then((response) => response.data)
        .catch(() => null);
}

export function putVisitPay(visitId: number): Promise<any | null> {
    return axios
        .put(API_BASE_PATH + ApiRoutes.VISIT_PAY.replace('{visitId}', visitId.toString()), undefined, {
            headers: {
                Guid: localStorage.getItem('client_uuid'),
            },
        })
        .then((response) => response.data)
        .catch(() => null);
}

export function postVisit(visitInfo: VisitToPost): Promise<any | null> {
    return axios
        .post(API_BASE_PATH + ApiRoutes.VISITS, visitInfo, {
            headers: {
                Guid: localStorage.getItem('client_uuid'),
            },
        })
        .then((response) => response.data)
        .catch(() => null);
}
