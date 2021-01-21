import {Box, Skeleton} from '@chakra-ui/react';
import React from 'react';
import {ClientRoutes} from '../../../../routing/routes';
import {VisitsList} from '../../../common/components/AppointmentList/AppointmentList';
import {useInit} from '../../../common/hooks/useInit';
import {useVisit} from '../../hooks/useVisit';
import {sortedVisits} from './YourAppointments.helpers';

export const YourAppointmentsView: React.FC = () => {
    const {visits, fetchVisits} = useVisit();
    const isLoaded = visits !== null;
    useInit(fetchVisits);

    return (
        <Box margin={8} marginTop={4}>
            <Skeleton isLoaded={isLoaded}>
                {visits !== null && <VisitsList visits={sortedVisits(visits ?? [])} detailsPath={ClientRoutes.CLIENT_CASE} />}
            </Skeleton>
        </Box>
    );
};
