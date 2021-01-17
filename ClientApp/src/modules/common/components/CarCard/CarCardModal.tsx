import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import React, {RefObject} from 'react';
import { useHistory } from 'react-router-dom';
import { ClientRoutes } from '../../../../routing/routes';

type Car = {
      licensePlate: string,
      model: string,
      type: string
} 

export const CarCardModal: React.FC = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const initialRef: RefObject<any> = React.useRef();
    const finalRef: RefObject<any> = React.useRef();

    const [model, setModel] = React.useState('');
    const [type, setType] = React.useState('');
    const [licensePlate, setLicensePlate] = React.useState('');

    function onChangeLicensePlate(e: React.FormEvent<HTMLInputElement>) {
        setLicensePlate(e.currentTarget.value)
    }

    function onChangeModel(e: React.FormEvent<HTMLInputElement>) {
        setModel(e.currentTarget.value);
    }

    function onSave(){
        var car: Car = {
            licensePlate: licensePlate,
            model: model,
            type: type
        }
        axios.post('/api/0.1.1/cars', car, {
            headers: {
                'Guid': localStorage.getItem('client_uuid')
            }
        }).then((res)=>{
            console.log(res.status) //TODO change to inform user about success/failure 
        })
        window.location.reload(); 
    }

    function onChangeType(e: React.ChangeEvent<HTMLSelectElement>) {
        setType(e.currentTarget.value);
    }

    return (
        <>
            <Button float="right" marginRight="20px" onClick={onOpen}>
                + Add Car
            </Button>

            <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Car</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <FormControl>
                            <FormLabel>License Plate</FormLabel>
                            <Input value={licensePlate} onChange={onChangeLicensePlate} ref={initialRef} placeholder="DWR 12N4" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Model</FormLabel>
                            <Input value={model} onChange={onChangeModel} ref={initialRef} placeholder="model" />
                        </FormControl>

                        

                        <FormControl mt={4}>
                            <FormLabel>Type</FormLabel>
                            <Select onChange={onChangeType} placeholder="Select type">
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="Hatchback">Hatchback</option>
                                <option value="Truck">Truck</option>
                                <option value="Compact">Compact</option>
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onSave} sDisabled={model === '' || type === ''} colorScheme="teal" mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
