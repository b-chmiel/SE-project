import {Box, Text} from '@chakra-ui/react';
import React from 'react';
import {ClientRoutes} from '../../../../routing/routes';
import {VisitsList} from '../../../common/components/AppointmentList/AppointmentList';
import {MockedAppointmentItems} from './YourAppointmentsView.mocks';

export const YourAppointmentsView: React.FC = () => {
    const appointments = MockedAppointmentItems;
    return (
        <Box margin={8} marginTop={4}>
            <VisitsList visits={appointments} detailsPath={ClientRoutes.CLIENT_CASE} />
            <Text fontSize={'6xl'}>MOCKED</Text>
        </Box>
    );
};
