import {Box} from '@chakra-ui/react';
import React from 'react';
import {AppointmentList} from '../../components/AppointmentList/AppointmentList';
import {MockedAppointmentItems} from './YourAppointmentsView.mocks';

export const YourAppointmentsView: React.FC = () => {
    const appointments = MockedAppointmentItems;
    return (
        <Box margin={8} marginTop={4}>
            <AppointmentList appointments={appointments} />
        </Box>
    );
};
