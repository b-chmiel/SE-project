import {Visit} from '../../api/visitAPI.types';

export const sortedVisits = (visits: Visit[]) => visits?.sort((a, b) => b.visitId - a.visitId);
