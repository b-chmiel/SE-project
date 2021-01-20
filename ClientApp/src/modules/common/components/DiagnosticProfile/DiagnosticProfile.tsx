import {
    Box,
    Button,
    GridItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import React, {RefObject, useEffect} from 'react';
import { DiagnosticProfileType } from './DiagnosticProfileType';

interface Props {
    licensePlate: string;
}

export const DiagnosticProfileButton: React.FC<Props> = ({licensePlate}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [diagnostics, setDiagnostics] = React.useState<DiagnosticProfileType>();
    const initialRef: RefObject<any> = React.useRef();
    const finalRef: RefObject<any> = React.useRef();

    useEffect(()=>{
        console.log(licensePlate)
        if(licensePlate!==''){
            axios.get('/api/0.1.1/cars/'+ licensePlate + '/profile',{
                headers: {
                    'Guid': localStorage.getItem('client_uuid')
                }
            }).then((res)=>{
                    setDiagnostics(res.data)
                }
            )
        }
    },[licensePlate])


    return (
        <>
            <Button float="right" marginRight="20px" onClick={onOpen}>
                Profile
            </Button>

            <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Car Diagnostic Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <GridItem colSpan={4} rowSpan={4}>
                        <Box color="darkgray" paddingTop="5px">
                            breaks: {diagnostics?.breaks}
                        </Box>
                        <Box color="darkgray">engine: {diagnostics?.engine}</Box>
                        <Box color="darkgray">body: {diagnostics?.body}</Box>
                        <Box color="darkgray">lighting: {diagnostics?.lighting}</Box>
                        <Box color="darkgray">battery: {diagnostics?.battery}</Box>
                        <Box color="darkgray">sensors: {diagnostics?.sensors}</Box>
                    </GridItem>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
