import {
    Button,
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
    Textarea,
} from '@chakra-ui/react';
import {Formik, FormikHelpers} from 'formik';
import * as React from 'react';
import {DatePicker} from '../../../common/components/DatePicker/DatePicker';
import {AvailableHours, initialFormValues} from './AppointmentView.constants';
import {checkIfHourIsAvailable, validate} from './AppointmentView.helpers';
import {AppointmentPriorityNames, AppointmentTypeNames, MakeAppointmentData} from './AppointmentView.types';

export const AppointmentView: React.FC = () => {
    const handleSubmit = (values: MakeAppointmentData, {setSubmitting}: FormikHelpers<MakeAppointmentData>) => {
        console.log(values);
        setSubmitting(false);
    };

    return (
        <Flex>
            <Formik initialValues={initialFormValues} validate={validate} onSubmit={handleSubmit}>
                {(props) => {
                    const {values, touched, errors, isSubmitting, isValid, handleChange, handleBlur, handleSubmit, setFieldValue} = props;

                    return (
                        <form onSubmit={handleSubmit}>
                            <Grid gap={8} templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)">
                                <GridItem colSpan={3} h={'200px'}>
                                    <FormControl isInvalid={!!(errors.actions && touched.actions)}>
                                        <FormLabel>DESCRIPTION</FormLabel>
                                        <Textarea
                                            name={'actions'}
                                            value={values.actions}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            resize={'none'}
                                            borderColor={!!(errors.actions && touched.actions) ? 'red' : 'inherit'}
                                            minH={'140px'}
                                        />
                                        <FormErrorMessage color={'red'}>{errors.actions}</FormErrorMessage>
                                    </FormControl>
                                </GridItem>
                                <GridItem rowStart={2}>
                                    <FormControl isInvalid={!!(errors.priority && touched.priority)}>
                                        <FormLabel>PRIORITY</FormLabel>
                                        <InputGroup>
                                            <Select name={'priority'} value={values.priority} onChange={handleChange} onBlur={handleBlur}>
                                                {AppointmentPriorityNames.map((name, i) => (
                                                    <option key={name} value={i}>
                                                        {name}
                                                    </option>
                                                ))}
                                            </Select>
                                        </InputGroup>
                                        <FormErrorMessage>{errors.priority}</FormErrorMessage>
                                    </FormControl>
                                </GridItem>
                                <GridItem rowStart={2}>
                                    <FormControl isInvalid={!!(errors.type && touched.type)}>
                                        <FormLabel>APPOINTMENT TYPE</FormLabel>
                                        <InputGroup>
                                            <Select name={'type'} value={values.type} onChange={handleChange} onBlur={handleBlur}>
                                                {AppointmentTypeNames.map((name, i) => (
                                                    <option value={i} key={name}>
                                                        {name}
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
                                <GridItem rowStart={2} colStart={3}>
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
                                    </FormControl>
                                </GridItem>
                            </Grid>
                        </form>
                    );
                }}
            </Formik>
        </Flex>
    );
};
