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
    Textarea,
    useDisclosure,
} from '@chakra-ui/react';
import React, {RefObject} from 'react';

function AddCarButton() {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const initialRef: RefObject<any> = React.useRef();
    const finalRef: RefObject<any> = React.useRef();

    const [model, setModel] = React.useState('');
    const [type, setType] = React.useState('');
    const [description, setDescription] = React.useState('');

    function onChangeModel(e: React.FormEvent<HTMLInputElement>) {
        console.log('a');
        console.log(e.currentTarget.value);
        setModel(e.currentTarget.value);
    }

    function onChangeType(e: React.FormEvent<HTMLInputElement>) {
        setType(e.currentTarget.value);
    }

    function onChangeDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
        if (e.currentTarget.value.length <= 300) {
            setDescription(e.currentTarget.value);
        }
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
                            <FormLabel>Model</FormLabel>
                            <Input value={model} onChange={onChangeModel} ref={initialRef} placeholder="model" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Type</FormLabel>
                            <Input value={type} onChange={onChangeType} placeholder="type" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Description max. 300 letters</FormLabel>
                            <Textarea value={description} onChange={onChangeDescription} placeholder="description" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="teal" mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddCarButton;
