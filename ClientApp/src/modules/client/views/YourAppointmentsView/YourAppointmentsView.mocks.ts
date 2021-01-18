import {Visit, VisitPriority, VisitStatus, VisitType} from '../../../employee/api/visitAPI.types';

export const MockedAppointmentItems: Visit[] = [
    {
        visitId: 5512,
        date: '2020-12-24T12:00:00+01',
        price: 100.5,
        requiredActions: ['oil change', 'breaks checking'],
        licensePlate: 'DDZ 18N0',
        priority: VisitPriority.EMERGENCY,
        type: VisitType.AIR_CONDITIONING_SYSTEM,
        status: VisitStatus.atService,
        assignedEmployees: [
            {
                employeeId: 12,
                name: 'Bolesław',
                surname: 'Nowak',
            },
            {
                employeeId: 13,
                name: 'Katarzyna',
                surname: 'Nowak',
            },
        ],
        carOwnerUsername: 'myUser',
    },
];
