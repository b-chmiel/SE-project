import {Box} from '@chakra-ui/react';
import React from 'react';
import {AppointmentList} from '../../../common/components/AppointmentList/AppointmentList';
import {MockedAppointmentItems} from './CaseListView.mocks';

export const CaseListView: React.FC = () => {
    const appointments = MockedAppointmentItems;
    return (
        <Box margin={8} marginTop={4}>
            <AppointmentList appointments={appointments} />
        </Box>
    );
};
