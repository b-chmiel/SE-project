import {FormikErrors} from 'formik';
import {AvailableHours} from './AppointmentView.constants';
import {MockedScheduledAppointments} from './AppointmentView.mocks';
import {AppointmentPriority, MakeAppointmentData} from './AppointmentView.types';

export const validate = (values: MakeAppointmentData) => {
    const errors: FormikErrors<MakeAppointmentData> = {};

    if (!values.actions) {
        console.log('sdf');
        errors.actions = 'Please specify description. ';
    }

    if (values.actions.length > 400) {
        errors.actions = 'Description should not exceed 400 characters. ';
    }

    return errors;
};

export const getAppointmentTypes = () => Object.values(AppointmentPriority).filter((key) => isNaN(Number(key)));

export const getSelectedDate = (selectedDate: Date) => selectedDate.toISOString().split('T')[0];

export const checkIfHourIsAvailable = (hour: string, date: Date) =>
    MockedScheduledAppointments[getSelectedDate(date)] !== undefined
        ? MockedScheduledAppointments[getSelectedDate(date)].indexOf(hour) === -1
        : true;

export const getFirstFreeHour = (date: Date) =>
    AvailableHours.find((hour: string) => MockedScheduledAppointments[getSelectedDate(date)]?.indexOf(hour) === -1) || '';
