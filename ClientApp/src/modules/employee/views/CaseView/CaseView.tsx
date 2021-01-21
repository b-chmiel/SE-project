import {Box, Button, createStandaloneToast, Flex, FormControl, Grid, GridItem, Text, useDisclosure} from '@chakra-ui/react';
import {format} from 'date-fns';
import {Field, Formik, FormikHelpers} from 'formik';
import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {WorkshopEmployeeRoutes} from '../../../../routing/routes';
import {CarCard} from '../../../common/components/CarCard/CarCard';
import {DatePicker} from '../../../common/components/DatePicker/DatePicker';
import {TextInfoBadge} from '../../../common/components/TextInfoBadge/TextInfoBadge';
import {TodoList} from '../../../common/components/TodoList/TodoList';
import {VisitStatus, VisitType} from '../../api/visitAPI.types';
import {ChangeStatusModal} from '../../components/ChangeStatusModal/ChangeStatusModal';
import {useCar} from '../../hooks/useCar';
import {useVisit} from '../../hooks/useVisit';
import {dateFormat, initialValues} from './CaseView.constants';
import {parsedDate} from './CaseView.helpers';
import {ActionsSubmitionType} from './CaseView.types';

export const CaseView: React.FC = () => {
    //@ts-ignore
    const {visitId} = useParams();
    const {visit, fetchVisit, diagnoseVisit, maintainVisit, repairVisit, updateVisit} = useVisit();
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

    const handleSubmit = (values: ActionsSubmitionType, {setSubmitting}: FormikHelpers<ActionsSubmitionType>) => {
        setSubmitting(true);
        if (visit !== null) {
            const {visitId, date, price, licensePlate, priority, type, status, assignedEmployees, carOwnerUsername} = visit;
            updateVisit({
                visitId,
                date,
                price,
                requiredActions: values.requiredActions,
                licensePlate,
                priority,
                type: VisitType[type as keyof typeof VisitType],
                status: VisitStatus[status as keyof typeof VisitStatus],
                assignedEmployees,
                carOwnerUsername,
            }).then((success) => {
                setSubmitting(false);
                if (success) {
                    toast({
                        title: 'Successful operation.',
                        description: 'Required actions has been posted.',
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: 'An error occurred.',
                        description: 'Unable to post required actions.',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                }
            });
        }
        setSubmitting(false);
    };

    const handleChangeStatus = () => {
        if (visit?.status === VisitStatus.PAID) {
            toast({
                title: 'An error occurred.',
                description: 'Could not modify status of paid visit.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        } else {
            onOpen();
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
    }, [isFound, setFound, handleSubmit]);

    return (
        <>
            {visit !== null && (
                <Box>
                    <ChangeStatusModal
                        isOpen={isOpen}
                        onClose={onClose}
                        currentStatus={visit?.status}
                        onStatusChange={handleStatusChange}
                    />
                    <Formik initialValues={initialValues(visit)} onSubmit={handleSubmit}>
                        {({touched, errors, isSubmitting, isValid, handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <Grid templateColumns="repeat(4, 1fr)" templateRows="repeat(1, 1fr)" h="320px" gap={4} marginRight={8}>
                                    <GridItem rowSpan={1} colSpan={2}>
                                        <CarCard licensePlate={car?.licensePlate ?? ''} model={car?.model ?? ''} type={car?.type ?? ''} />
                                    </GridItem>
                                    <GridItem rowSpan={1} colSpan={1} marginTop={4}>
                                        <DatePicker
                                            name={'date'}
                                            value={parsedDate(visit)}
                                            onChange={() => {}}
                                            showPopperArrow
                                            disabled={true}
                                            isUnlimited
                                        />
                                    </GridItem>
                                    <GridItem rowSpan={1} colSpan={1} marginTop={2}>
                                        <Button width="242px" margin={2} onClick={() => handleChangeStatus()}>
                                            CHANGE STATUS
                                        </Button>
                                        <Button
                                            width="242px"
                                            margin={2}
                                            onClick={() => handleSubmit()}
                                            isDisabled={isSubmitting || !isValid}
                                            isLoading={isSubmitting}
                                        >
                                            SUBMIT REQUIRED ACTIONS
                                        </Button>
                                    </GridItem>
                                </Grid>
                                <Flex justifyContent={'space-between'} paddingRight={12}>
                                    <TextInfoBadge title={'TYPE'} value={visit?.type ?? ''} />
                                    <TextInfoBadge title={'PRIORITY'} value={visit?.priority ?? ''} />
                                    <TextInfoBadge title={'CURRENT STATUS'} value={visit?.status ?? ''} />
                                    <TextInfoBadge title={'EXACT DATE'} value={format(parsedDate(visit), dateFormat)} />
                                </Flex>
                                <FormControl isInvalid={!!(errors.requiredActions && touched.requiredActions)}>
                                    <Box margin={4}>
                                        <Text as="b" fontSize={'lg'}>
                                            REQUIRED ACTIONS
                                        </Text>
                                        <Field name="requiredActions" component={TodoList} />
                                    </Box>
                                </FormControl>
                            </form>
                        )}
                    </Formik>
                </Box>
            )}
        </>
    );
};
