import {useState} from 'react';
import {getVisit, getVisits, postVisit, putVisitPay} from '../api/visitAPI';
import {Visit, VisitToPost} from '../api/visitAPI.types';
import {normalizeVisit} from '../helpers/normalizeVisit';

export function useVisit() {
    const [visits, setVisits] = useState<Visit[] | null>(null);
    const [visit, setVisit] = useState<Visit | null>(null);
    const [isFetching, setFetching] = useState(false);

    async function fetchVisits(): Promise<boolean> {
        setFetching(true);

        const response = await getVisits();
        if (response !== null) {
            setVisits(response);
            setFetching(false);
            return true;
        }
        setFetching(false);
        return false;
    }

    async function fetchVisit(visitId: number): Promise<boolean> {
        setFetching(true);

        const response = await getVisit(visitId);
        if (response !== null) {
            setVisit(normalizeVisit(response));
            setFetching(false);
            return true;
        }
        setFetching(false);
        return false;
    }

    async function payVisit(visitId: number): Promise<boolean> {
        setFetching(true);

        const response = await putVisitPay(visitId);
        if (response !== null) {
            setFetching(false);
            return true;
        }
        setFetching(false);
        return false;
    }

    async function createVisit(visitInfo: VisitToPost): Promise<boolean> {
        setFetching(true);

        const response = await postVisit(visitInfo);
        if (response !== null) {
            setFetching(false);
            return true;
        }
        setFetching(false);
        return false;
    }

    return {isFetching, visits, visit, fetchVisits, fetchVisit, payVisit, createVisit};
}
