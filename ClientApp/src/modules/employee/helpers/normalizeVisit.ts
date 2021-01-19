import {Visit, VisitPriority, VisitStatus, VisitType} from '../api/visitAPI.types';

export const normalizeVisit = ({
    visitId,
    date,
    price,
    requiredActions,
    licensePlate,
    priority,
    type,
    status,
    assignedEmployees,
    carOwnerUsername,
}: Visit): Visit => ({
    visitId: visitId ?? '',
    date: date ?? '',
    price: price ?? '',
    requiredActions: removeEmptyStringsFromArray(requiredActions) ?? [],
    licensePlate: licensePlate.toUpperCase() ?? '',
    priority: VisitPriority[priority.toUpperCase() as keyof typeof VisitPriority] ?? '',
    type: VisitType[type.toUpperCase() as keyof typeof VisitType] ?? '',
    status: VisitStatus[status.toUpperCase() as keyof typeof VisitStatus] ?? '',
    assignedEmployees: assignedEmployees ?? [],
    carOwnerUsername: carOwnerUsername ?? '',
});

const removeEmptyStringsFromArray = (array: string[]) => array.filter((x) => x.length !== 0);
