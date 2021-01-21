import {parseISO} from 'date-fns';
import {Visit} from '../../api/visitAPI.types';

export const parsedDate = (visit: Visit | null) => (visit !== null ? parseISO(visit.date) : new Date());
