import {useState} from 'react';
import {getVisit, getVisits, putVisit, putVisitDiagnose, putVisitMaintain, putVisitRepair} from '../api/visitAPI';
import {Visit} from '../api/visitAPI.types';

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
            setVisit(response);
            setFetching(false);
            return true;
        }
        setFetching(false);
        return false;
    }

    async function updateVisit(visitInfo: Visit): Promise<boolean> {
        setFetching(true);

        const response = await putVisit(visitInfo);
        if (response !== null) {
            setFetching(false);
            return true;
        }
        setFetching(true);
        return false;
    }

    async function repairVisit(visitId: number): Promise<boolean> {
        setFetching(true);

        const response = await putVisitRepair(visitId);
        if (response !== null) {
            setFetching(false);
            return true;
        }
        setFetching(false);
        return false;
    }

    async function maintainVisit(visitId: number): Promise<boolean> {
        setFetching(true);

        const response = await putVisitMaintain(visitId);
        if (response !== null) {
            setFetching(false);
            return true;
        }
        setFetching(false);
        return false;
    }

    async function diagnoseVisit(visitId: number): Promise<boolean> {
        setFetching(true);

        const response = await putVisitDiagnose(visitId);
        if (response !== null) {
            setFetching(false);
            return true;
        }
        setFetching(false);
        return false;
    }

    return {isFetching, visits, visit, fetchVisits, fetchVisit, updateVisit, diagnoseVisit: repairVisit};
}
