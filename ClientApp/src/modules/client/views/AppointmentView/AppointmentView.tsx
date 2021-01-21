import {
    Button,
    createStandaloneToast,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    InputGroup,
    Radio,
    RadioGroup,
    Select,
} from '@chakra-ui/react';
import {Field, Formik, FormikHelpers} from 'formik';
import * as React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {ClientRoutes} from '../../../../routing/routes';
import {DatePicker} from '../../../common/components/DatePicker/DatePicker';
import {TodoList} from '../../../common/components/TodoList/TodoList';
import {visitPriorities, visitTypes} from '../../helpers/enumHelpers';
import {useVisit} from '../../hooks/useVisit';
import {AvailableHours, initialFormValues} from './AppointmentView.constants';
import {checkIfHourIsAvailable, formatVisit, validate} from './AppointmentView.helpers';
import {VisitSubmitionType} from './AppointmentView.types';

export const AppointmentView: React.FC = () => {
    //@ts-ignore
    const {licensePlate} = useParams();
    const {createVisit} = useVisit();
    const history = useHistory();
    const toast = createStandaloneToast();

    const handleSubmit = (values: VisitSubmitionType, {setSubmitting}: FormikHelpers<VisitSubmitionType>) => {
        setSubmitting(true);
        createVisit(formatVisit(values, licensePlate)).then((success) => {
            if (success) {
                history.push(ClientRoutes.APPOINTMENTS);
            } else {
                setSubmitting(false);
                toast({
                    title: 'An error occurred.',
                    description: 'Unable to post visit info.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
        });
    };

    return (
        <Flex>
            <Formik initialValues={initialFormValues} validate={validate} onSubmit={handleSubmit}>
                {(props) => {
                    const {values, touched, errors, isSubmitting, isValid, handleChange, handleBlur, handleSubmit, setFieldValue} = props;

                    return (
                        <form onSubmit={handleSubmit}>
                            <Grid gap={8} templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)">
                                <GridItem rowStart={1}>
                                    <FormControl isInvalid={!!(errors.priority && touched.priority)}>
                                        <FormLabel>PRIORITY</FormLabel>
                                        <InputGroup>
                                            <Select name={'priority'} value={values.priority} onChange={handleChange} onBlur={handleBlur}>
                                                {visitPriorities.map((name, i) => (
                                                    <option key={name} value={name}>
                                                        {name.replace('_', ' ')}
                                                    </option>
                                                ))}
                                            </Select>
                                        </InputGroup>
                                        <FormErrorMessage>{errors.priority}</FormErrorMessage>
                                    </FormControl>
                                </GridItem>
                                <GridItem rowStart={1}>
                                    <FormControl isInvalid={!!(errors.type && touched.type)}>
                                        <FormLabel>APPOINTMENT TYPE</FormLabel>
                                        <InputGroup>
                                            <Select name={'type'} value={values.type} onChange={handleChange} onBlur={handleBlur}>
                                                {visitTypes.map((name, i) => (
                                                    <option value={name} key={name}>
                                                        {name.replace('_', ' ')}
                                                    </option>
                                                ))}
                                            </Select>
                                        </InputGroup>
                                        <FormErrorMessage>{errors.type}</FormErrorMessage>
                                    </FormControl>
                                </GridItem>
                                <GridItem colStart={4} colEnd={6} rowSpan={2} colSpan={2}>
                                    <FormControl isInvalid={!!(errors.date && touched.date)}>
                                        <DatePicker name={'date'} value={values.date} onChange={setFieldValue} showPopperArrow />
                                    </FormControl>
                                    <Button
                                        marginTop={8}
                                        width={'244px'}
                                        type={'submit'}
                                        isDisabled={isSubmitting || !isValid}
                                        isLoading={isSubmitting}
                                        onClick={() => handleSubmit()}
                                    >
                                        SAVE
                                    </Button>
                                </GridItem>
                                <GridItem rowStart={1} colStart={3}>
                                    <FormControl isInvalid={!!(errors.time && touched.time)}>
                                        <FormLabel>AVAILABLE HOURS</FormLabel>
                                        <RadioGroup
                                            name={'time'}
                                            onChange={(value: any) => setFieldValue('time', value as string)}
                                            onBlur={handleBlur}
                                            value={values.time}
                                        >
                                            <Grid templateColumns="repeat(3, 1fr)">
                                                {AvailableHours.map((value) => (
                                                    <Radio
                                                        key={value}
                                                        value={value}
                                                        isDisabled={!checkIfHourIsAvailable(value, values.date)}
                                                        margin={1}
                                                    >
                                                        {value}
                                                    </Radio>
                                                ))}
                                            </Grid>
                                        </RadioGroup>
                                        <FormErrorMessage>{errors.time}</FormErrorMessage>
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={3} h={'200px'}>
                                    <FormLabel>REQUIRED ACTIONS</FormLabel>
                                    <Field name="requiredActions" component={TodoList} />
                                </GridItem>
                            </Grid>
                        </form>
                    );
                }}
            </Formik>
        </Flex>
    );
};
