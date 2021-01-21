import {Box, Button, createStandaloneToast, Flex, Grid, GridItem, ListItem, Text, UnorderedList, useDisclosure} from '@chakra-ui/react';
import {format} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {WorkshopEmployeeRoutes} from '../../../../routing/routes';
import {CarCard} from '../../../common/components/CarCard/CarCard';
import {DatePicker} from '../../../common/components/DatePicker/DatePicker';
import {TextInfoBadge} from '../../../common/components/TextInfoBadge/TextInfoBadge';
import {VisitStatus} from '../../api/visitAPI.types';
import {ChangeStatusModal} from '../../components/ChangeStatusModal/ChangeStatusModal';
import {useCar} from '../../hooks/useCar';
import {useVisit} from '../../hooks/useVisit';
import {dateFormat} from './CaseView.constants';
import {parsedDate} from './CaseView.helpers';

export const CaseView: React.FC = () => {
    //@ts-ignore
    const {visitId} = useParams();
    const {visit, fetchVisit, diagnoseVisit, maintainVisit, repairVisit} = useVisit();
    const {car, fetchCar} = useCar();
    const history = useHistory();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [isFound, setFound] = useState<boolean | undefined>(undefined);

    const toast = createStandaloneToast();

    const handleStatusChange = async (newStatus: VisitStatus) => {
        if (visit !== null) {
            switch (newStatus) {
                case VisitStatus.ATSERVICE:
                    diagnoseVisit(visitId);
                    return await fetchVisit(visitId);
                case VisitStatus.CHECKEDIN:
                    maintainVisit(visitId);
                    return await fetchVisit(visitId);
                case VisitStatus.REPAIRED:
                    repairVisit(visitId);
                    return await fetchVisit(visitId);
            }
        }
    };

    useEffect(() => {
        if (car === null) {
            if (visit === null) fetchVisit(visitId).then((result) => setFound(result));

            if (isFound !== undefined) {
                if (!isFound) {
                    toast({
                        title: 'An error occurred.',
                        description: 'Unable to fetch visit info.',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                    history.push(WorkshopEmployeeRoutes.CASES);
                }

                if (isFound && visit !== null) {
                    fetchCar(visit.licensePlate);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFound, setFound]);

    return (
        <>
            {visit !== null && (
                <ChangeStatusModal isOpen={isOpen} onClose={onClose} currentStatus={visit?.status} onStatusChange={handleStatusChange} />
            )}

            <Grid templateColumns="repeat(4, 1fr)" templateRows="repeat(2, 1fr)" h="420px" gap={4} marginRight={8}>
                <GridItem rowSpan={1} colSpan={2}>
                    <CarCard licensePlate={car?.licensePlate ?? ''} model={car?.model ?? ''} type={car?.type ?? ''} />
                </GridItem>
                <GridItem rowSpan={1} colSpan={1} marginTop={4}>
                    <DatePicker name={'date'} value={parsedDate(visit)} onChange={() => {}} showPopperArrow disabled={true} isUnlimited />
                </GridItem>
                <GridItem rowSpan={1} colSpan={1} marginTop={2}>
                    <Button width="242px" margin={2} onClick={onOpen}>
                        CHANGE STATUS
                    </Button>
                    <Button width="242px" margin={2}>
                        REPORT ISSUES
                    </Button>
                    <Button width="242px" margin={2}>
                        DIAGNOSTIC
                    </Button>
                </GridItem>
                <GridItem rowSpan={1} colSpan={4} rowStart={2}>
                    <Flex justifyContent={'space-between'} paddingRight={12}>
                        <TextInfoBadge title={'TYPE'} value={visit?.type ?? ''} />
                        <TextInfoBadge title={'PRIORITY'} value={visit?.priority ?? ''} />
                        <TextInfoBadge title={'CURRENT STATUS'} value={visit?.status ?? ''} />
                        <TextInfoBadge title={'EXACT DATE'} value={format(parsedDate(visit), dateFormat)} />
                    </Flex>
                </GridItem>
            </Grid>
            <Box margin={4} marginRight={16}>
                <Text as="b" fontSize={'lg'}>
                    REQUIRED ACTIONS
                </Text>
                <UnorderedList>
                    {visit?.requiredActions.length !== 0 ? (
                        visit?.requiredActions?.map((action, i) => <ListItem key={i}>{action}</ListItem>)
                    ) : (
                        <Text>No assigned actions</Text>
                    )}
                </UnorderedList>
            </Box>
            <Box margin={4} marginRight={16}>
                <Text as="b" fontSize={'lg'}>
                    ASSIGNED EMPLOYEES
                </Text>
                <UnorderedList>
                    {visit?.assignedEmployees.length !== 0 ? (
                        visit?.assignedEmployees?.map((action, i) => <ListItem key={i}>{action}</ListItem>)
                    ) : (
                        <Text>No assigned employees</Text>
                    )}
                </UnorderedList>
            </Box>
        </>
    );
};
