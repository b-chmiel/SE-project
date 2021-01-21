import {Button, createStandaloneToast, Grid, GridItem, Text, useDisclosure} from '@chakra-ui/react';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {ClientRoutes} from '../../../../routing/routes';
import {CarCard} from '../../../common/components/CarCard/CarCard';
import {DatePicker} from '../../../common/components/DatePicker/DatePicker';
import {TextInfoBadge} from '../../../common/components/TextInfoBadge/TextInfoBadge';
import {VisitStatus} from '../../api/visitAPI.types';
import {ActionsList} from '../../components/ActionsList/ActionsList';
import {FinishTransactionModal} from '../../components/FinishTransactionModal/FinishTransactionModal';
import {useCar} from '../../hooks/useCar';
import {useVisit} from '../../hooks/useVisit';
import {parsedDate} from './AppointmentDetailView.helpers';

export const AppointmentDetailView: React.FC = () => {
    //@ts-ignore
    const {visitId} = useParams();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {visit, fetchVisit, payVisit} = useVisit();
    const {car, fetchCar} = useCar();
    const history = useHistory();
    const toast = createStandaloneToast();

    const [isFound, setFound] = useState<boolean | undefined>(undefined);

    const onPayClick = () => {
        if (visit?.status === VisitStatus.REPAIRED) {
            onOpen();
        } else if (visit?.status === VisitStatus.PAID) {
            toast({
                title: 'Payment error.',
                description: 'This visit is currently paid.',
                status: 'warning',
                duration: 9000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Payment error.',
                description: 'Please wait till status changes to repaired.',
                status: 'warning',
                duration: 9000,
                isClosable: true,
            });
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
                    history.push(ClientRoutes.APPOINTMENTS);
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
            {visit !== null && (
                <FinishTransactionModal isOpen={isOpen} onClose={onClose} onPay={payVisit} visitId={visit.visitId} price={visit.price} />
            )}
            <Grid gap={8} templateRows="repeat(2, 1fr)" templateColumns="repeat(6, 1fr)">
                <GridItem rowSpan={1} colSpan={2} colStart={1} rowStart={1} marginLeft={6}>
                    <Text as="b" color={'windsor'} fontSize={'20px'}>
                        YOUR CAN PICK UP A CAR AT...
                    </Text>
                    <DatePicker name={'date'} value={parsedDate(visit)} onChange={() => {}} showPopperArrow isUnlimited />
                </GridItem>
                <GridItem color={'windsor'} rowStart={1} rowSpan={1} colSpan={2} colStart={3}>
                    <TextInfoBadge title={'TYPE'} value={visit?.type ?? ''} />
                    <TextInfoBadge title={'PRIORITY'} value={visit?.priority ?? ''} />
                    <TextInfoBadge title={'STATUS'} value={visit?.status ?? 'No status available'} />
                </GridItem>
                <GridItem colSpan={3} rowStart={1}>
                    <ActionsList actions={visit?.requiredActions ?? []} title={'ACTIONS'} />
                </GridItem>
                <GridItem rowSpan={2} colSpan={2} rowStart={2}>
                    <GridItem rowSpan={1} colSpan={2}>
                        <CarCard licensePlate={visit?.licensePlate ?? ''} model={car?.model!} type={car?.type!}></CarCard>
                    </GridItem>
                </GridItem>
                <GridItem textAlign="center" rowSpan={1} colSpan={1} rowStart={2} colStart={5}>
                    <Text as="b" color={'windsor'} fontSize={'20px'}>
                        COST
                    </Text>
                    <Text color={'windsor'} fontSize={'20px'}>
                        {visit?.price ?? ''} PLN
                    </Text>
                    <Button onClick={() => onPayClick()} width="242px" margin={2} padding={10}>
                        PAY FOR SERVICE
                    </Button>
                    <Button width="242px" margin={2} padding={10} as={'a'} href="tel:654654654">
                        CALL TO WORKSHOP
                    </Button>
                </GridItem>
            </Grid>
        </>
    );
};
