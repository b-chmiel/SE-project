import React from 'react';
import {AppointmentItem} from './AppointmentItem/AppointmentItem';
import {Appointment} from './AppointmentList.types';

interface Props {
    appointments: Appointment[];
}
export const AppointmentList: React.FC<Props> = ({appointments}) => {
    return (
        <>
            {appointments?.map((appointment, i) => (
                <AppointmentItem appointment={appointment} key={i} />
            ))}
        </>
    );
};
