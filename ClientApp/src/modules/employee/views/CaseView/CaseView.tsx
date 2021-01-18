import {Box, Button, createStandaloneToast, Grid, GridItem, ListItem, Text, UnorderedList} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {WorkshopEmployeeRoutes} from '../../../../routing/routes';
import {CarCard} from '../../../common/components/CarCard/CarCard';
import {DatePicker} from '../../../common/components/DatePicker/DatePicker';
import {TextInfoBadge} from '../../../common/components/TextInfoBadge/TextInfoBadge';
import {useCar} from '../../hooks/useCar';
import {useVisit} from '../../hooks/useVisit';

export const CaseView: React.FC = () => {
    //@ts-ignore
    const {caseId} = useParams();
    const {visit, fetchVisit} = useVisit();
    const {car, fetchCar} = useCar();

    const [isFound, setFound] = useState<boolean | undefined>(undefined);

    const history = useHistory();
    const toast = createStandaloneToast();

    useEffect(() => {
        if (car === null) {
            if (visit === null) fetchVisit(caseId).then((result) => setFound(result));

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
    console.log(visit);

    return (
        <>
            <Grid templateColumns="repeat(4, 1fr)" templateRows="repeat(2, 1fr)" h="420px" gap={4} marginRight={8}>
                <GridItem rowSpan={1} colSpan={2}>
                    <CarCard licensePlate={car?.licensePlate ?? ''} model={car?.model ?? ''} type={car?.type ?? ''} />
                </GridItem>
                <GridItem rowSpan={2} colSpan={1} marginTop={4}>
                    <DatePicker name={'date'} value={new Date()} onChange={() => {}} showPopperArrow disabled={true} />
                </GridItem>
                <GridItem rowSpan={2} colSpan={1} marginTop={2}>
                    <Button width="242px" margin={2}>
                        CHANGE STATUS
                    </Button>
                    <Button width="242px" margin={2}>
                        REPORT ISSUES
                    </Button>
                    <Button width="242px" margin={2}>
                        DIAGNOSTIC
                    </Button>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1} rowStart={2}>
                    <TextInfoBadge title={'TYPE'} value={visit?.type ?? ''} />
                    <TextInfoBadge title={'PRIORITY'} value={visit?.priority ?? ''} />
                </GridItem>
                <GridItem rowSpan={2} colSpan={1} rowStart={2} colStart={2}>
                    <TextInfoBadge title={'CURRENT STATUS'} value={visit?.status ?? ''} />
                </GridItem>
            </Grid>
            <Box margin={4} marginRight={16}>
                <Text as="b" fontSize={'lg'}>
                    REQUIRED ACTIONS
                </Text>
                <UnorderedList>
                    {visit?.requiredActions?.map((action) => (
                        <ListItem>{action}</ListItem>
                    ))}
                </UnorderedList>
            </Box>
            <Box margin={4} marginRight={16}>
                <Text as="b" fontSize={'lg'}>
                    ASSIGNED EMPLOYEES
                </Text>
                <UnorderedList>
                    {visit?.assignedEmployees !== undefined ? (
                        visit?.assignedEmployees?.map((action) => <ListItem>{action}</ListItem>)
                    ) : (
                        <Text>No assigned employees</Text>
                    )}
                </UnorderedList>
            </Box>
        </>
    );
};
