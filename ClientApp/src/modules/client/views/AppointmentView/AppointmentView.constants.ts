import {getTomorrow} from '../../../common/helpers/getTomorrow';
import {getFirstFreeHour} from './AppointmentView.helpers';
import {VisitSubmitionType} from './AppointmentView.types';

export const AvailableHours: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

export const initialFormValues: VisitSubmitionType = {
    date: getTomorrow(),
    time: getFirstFreeHour(getTomorrow()),
    requiredActions: [],
    priority: 'MEDIUM',
    type: 'PREVENTIVE_MAINTENANCE_SERVICE',
};
