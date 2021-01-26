import {
    Button,
    createStandaloneToast,
    FormControl,
    FormErrorMessage,
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
import {Formik, FormikHelpers} from 'formik';
import React, {RefObject} from 'react';
import {Car, CarType} from '../../api/carAPI.types';
import {useCar} from '../../hooks/useCar';
import {initialFormValues} from './CarCard.constants';
import {validate} from './CarCard.helpers';

export const CarCardModal: React.FC = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const initialRef: RefObject<any> = React.useRef();
    const finalRef: RefObject<any> = React.useRef();

    const {addCar} = useCar();
    const toast = createStandaloneToast();

    function handleSubmit(values: Car, {setSubmitting}: FormikHelpers<Car>) {
        setSubmitting(true);
        addCar(values).then((success) => {
            if (success) {
                setSubmitting(false);
                window.location.reload();
            } else {
                setSubmitting(false);
                toast({
                    title: 'An error occurred.',
                    description: 'Car with given license plate exists. ',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
        });
    }

    return (
        <>
            <Button float="right" marginRight="20px" onClick={onOpen}>
                + Add Car
            </Button>

            <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <Formik initialValues={initialFormValues} validate={validate} onSubmit={handleSubmit}>
                        {(props) => {
                            const {values, touched, errors, isSubmitting, isValid, handleChange, handleBlur, handleSubmit} = props;
                            return (
                                <form onSubmit={handleSubmit}>
                                    <ModalHeader>Add Car</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody pb={6}>
                                        <FormControl isInvalid={!!(errors.licensePlate && touched.licensePlate)}>
                                            <FormLabel>License Plate</FormLabel>
                                            <Input
                                                name={'licensePlate'}
                                                value={values.licensePlate}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="DWR 12N4"
                                            />
                                            <FormErrorMessage>{errors.licensePlate}</FormErrorMessage>
                                        </FormControl>
                                        <FormControl isInvalid={!!(errors.model && touched.model)}>
                                            <FormLabel>Model</FormLabel>
                                            <Input name={'model'} value={values.model} onChange={handleChange} onBlur={handleBlur} />
                                            <FormErrorMessage>{errors.model}</FormErrorMessage>
                                        </FormControl>

                                        <FormControl mt={4} isInvalid={!!(errors.type && errors.type)}>
                                            <FormLabel>Type</FormLabel>
                                            <Select name={'type'} value={values.type} onChange={handleChange}>
                                                <option value={CarType.sedan} key={CarType.sedan}>
                                                    Sedan
                                                </option>
                                                <option value={CarType.SUV} key={CarType.SUV}>
                                                    SUV
                                                </option>
                                                <option value={CarType.hatchback} key={CarType.hatchback}>
                                                    Hatchback
                                                </option>
                                                <option value={CarType.truck} key={CarType.truck}>
                                                    Truck
                                                </option>
                                                <option value={CarType.compact} key={CarType.compact}>
                                                    Compact
                                                </option>
                                            </Select>
                                        </FormControl>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button
                                            onClick={() => handleSubmit()}
                                            isDisabled={isSubmitting || !isValid}
                                            colorScheme="teal"
                                            type={'submit'}
                                            mr={3}
                                            isLoading={isSubmitting}
                                        >
                                            Save
                                        </Button>
                                        <Button onClick={onClose}>Cancel</Button>
                                    </ModalFooter>
                                </form>
                            );
                        }}
                    </Formik>
                </ModalContent>
            </Modal>
        </>
    );
};
