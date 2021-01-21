import {FormikErrors} from 'formik';
import {AvailableHours} from './AppointmentView.constants';
import {MockedScheduledAppointments} from './AppointmentView.mocks';
import {VisitSubmitionType} from './AppointmentView.types';

export const validate = (values: VisitSubmitionType) => {
    const errors: FormikErrors<VisitSubmitionType> = {};

    if (values.time.length === 0) {
        errors.time = 'Please select hour of appointment';
    }
    return errors;
};

export const getSelectedDate = (selectedDate: Date) => selectedDate.toISOString().split('T')[0];

export const checkIfHourIsAvailable = (hour: string, date: Date) =>
    MockedScheduledAppointments[getSelectedDate(date)] !== undefined
        ? MockedScheduledAppointments[getSelectedDate(date)].indexOf(hour) === -1
        : true;

export const getFirstFreeHour = (date: Date) =>
    AvailableHours.find(() => MockedScheduledAppointments[getSelectedDate(date)] === undefined) || '';

export const formatVisit = (visitInfo: VisitSubmitionType, licensePlate: string) => ({
    licensePlate,
    date: `${getSelectedDate(new Date(visitInfo.date))}T${visitInfo.time}:00+01`,
    requiredActions: visitInfo.requiredActions,
    priority: visitInfo.priority,
    type: visitInfo.type,
});
