import {getTomorrow} from '../../../common/helpers/getTomorrow';
import {getFirstFreeHour} from './AppointmentView.helpers';
import {AppointmentPriority, AppointmentType, MakeAppointmentData} from './AppointmentView.types';

export const AvailableHours: string[] = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

export const initialFormValues: MakeAppointmentData = {
    date: getTomorrow(),
    time: getFirstFreeHour(getTomorrow()),
    actions: [],
    priority: AppointmentPriority.MEDIUM,
    type: AppointmentType.CAR_CARE,
};
