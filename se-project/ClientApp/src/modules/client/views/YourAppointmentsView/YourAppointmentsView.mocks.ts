import {Appointment} from '../../components/AppointmentList/AppointmentList.types';

export const MockedAppointmentItems: Appointment[] = [
    {
        carName: 'OPEL ASTRA',
        appointmentDate: new Date(),
        appointmentStatus: 'planned',
    },
    {
        carName: 'OPEL ASTRA',
        appointmentDate: new Date(),
        appointmentStatus: 'atService',
    },
    {
        carName: 'OPEL ASTRA',
        appointmentDate: new Date(),
        appointmentStatus: 'repaired',
    },
    {
        carName: 'OPEL ASTRA',
        appointmentDate: new Date(),
        appointmentStatus: 'checkedIn',
    },
];
