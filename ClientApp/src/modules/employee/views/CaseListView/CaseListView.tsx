import {Box} from '@chakra-ui/react';
import React from 'react';
import {WorkshopEmployeeRoutes} from '../../../../routing/routes';
import {VisitsList} from '../../../common/components/AppointmentList/AppointmentList';
import {MockedAppointmentItems} from './CaseListView.mocks';

export const CaseListView: React.FC = () => {
    const visits = MockedAppointmentItems;
    // const {visits, fetchVisits, isFetching} = useVisit();
    // useInit(fetchVisits);
    return (
        <Box margin={8} marginTop={4}>
            <VisitsList visits={visits} detailsPath={WorkshopEmployeeRoutes.CASE_DETAILS} />
        </Box>
    );
};
