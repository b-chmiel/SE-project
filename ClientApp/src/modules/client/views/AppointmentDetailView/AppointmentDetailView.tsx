import { Button, Grid, GridItem, Text, FormControl } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import * as React from 'react';
import {DatePicker} from '../../../common/components/DatePicker/DatePicker';
import {DescriptionCard} from '../../../common/components/DescriptionCard/DescriptionCard';
import {TextInfoBadge} from '../../../common/components/TextInfoBadge/TextInfoBadge';
import {ActionsList} from '../../components/ActionsList/ActionsList';
import {CarCard} from '../../../common/components/CarCard/CarCard';
import {MockedClientCarInfo} from './AppointmentDetailView.mocks';
import {MockedServicePrice} from './AppointmentDetailView.mocks';
import {MockedDate} from './AppointmentDetailView.mocks';
import { useEffect } from 'react';
import axios from 'axios';
import { API_BASE_PATH } from '../../../../routing/routes';
import { Car } from '../../../employee/api/carAPI.types';
import { Visit } from '../../../employee/api/visitAPI.types';
import { useLocation } from 'react-router-dom';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const AppointmentDetailView: React.FC = () => {
    let query = useQuery();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const carInfo = MockedClientCarInfo;
    const mockedCost = MockedServicePrice;
    const mockedDate = MockedDate;

    const [c, setC] = React.useState<Car>();
    const [visit, setVisit] = React.useState<Visit>();

    const visitId = query.get("visitId");

    useEffect(()=>{
        axios.get(API_BASE_PATH+'/visits/'+visitId, {
            headers: {
                'Guid': localStorage.getItem('client_uuid')
            }
        }).then((res)=>{
            setVisit(res.data)
            axios.get(API_BASE_PATH+"/cars/"+res.data.licensePlate)
            .then((r)=>{
                setC(r.data);
            });
        })
    },[visitId])


    return (
        <>
            <Grid gap={8} templateRows="repeat(2, 1fr)" templateColumns="repeat(6, 1fr)">
                <GridItem rowSpan={2} colSpan={2} marginTop={4}>
                    <Text as="b" color={'windsor'} fontSize={'20px'} >YOUR CAN PICK UP A CAR AT...</Text>
                    {/* <DatePicker name={'date'} value={mockedDate} onChange={(d) => console.log(d)} showPopperArrow /> */}
                </GridItem>
                <GridItem color={'windsor'} rowSpan={1} colSpan={1} marginTop={4}>
                    <DescriptionCard description={carInfo.description} />
                </GridItem>
                <GridItem color={'windsor'} rowSpan={1} colSpan={1}>
                    <TextInfoBadge title={'TYPE'} value={carInfo.appointmentType} />
                    <TextInfoBadge title={'PRIORITY'} value={carInfo.priority} />
                </GridItem>
                <GridItem color={'windsor'} rowSpan={1} colSpan={2} colStart={3} rowStart={2}>
                    <ActionsList actions={carInfo.commentsFromWorkshop} title={'COMMENTS FROM WORKSHOP'} />
                </GridItem>
                <GridItem color={'windsor'} rowSpan={2} colSpan={2}>
                    <ActionsList actions={carInfo.actions} title={'ACTIONS'} />
                </GridItem>
            </Grid>
            <Grid gap={8} templateRows="repeat(2, 1fr)" templateColumns="repeat(3, 1fr)" marginTop={10}>
                <GridItem rowSpan={2} colSpan={2}>
                    <GridItem rowSpan={1} colSpan={2}>
                        <CarCard
                            licensePlate={c?.licensePlate!}
                            model={c?.model!}
                            type={c?.type!}
                            showAppointmentButton
                        ></CarCard>
                    </GridItem>
                </GridItem>
                <GridItem textAlign="center" rowSpan={2} colSpan={1}>
                    <Text as="b" color={'windsor'} fontSize={'20px'} >COST</Text>
                    <Text color={'windsor'} fontSize={'20px'} >{mockedCost.price+" PLN"}</Text>
                    <Button onClick={onOpen} width="242px" margin={2} padding={10}>
                        PAY FOR SERVICE
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                        <ModalHeader>Payment</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Are you sure to finish transaction?
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>Yes</Button>
                            <Button variant="ghost">No</Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Button width="242px" margin={2} padding={10}>
                        CALL TO WORKSHOP
                    </Button>
                </GridItem>
            </Grid>
        </>
    );
};
