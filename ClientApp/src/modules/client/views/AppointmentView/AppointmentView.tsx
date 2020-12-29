import {Button, Flex, FormControl, FormErrorMessage, FormLabel, InputGroup, Radio, RadioGroup, Select, Textarea} from '@chakra-ui/react';
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
                            <FormControl isInvalid={!!(errors.actions && touched.actions)}>
                                <FormLabel>DESCRIPTION</FormLabel>
                                <InputGroup>
                                    <Textarea name={'actions'} value={values.actions} onChange={handleChange} onBlur={handleBlur} />
                                </InputGroup>
                                <FormErrorMessage>{errors.actions}</FormErrorMessage>
                            </FormControl>
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
                            <FormControl isInvalid={!!(errors.date && touched.date)}>
                                <DatePicker name={'date'} value={values.date} onChange={setFieldValue} showPopperArrow />
                            </FormControl>
                            <FormControl isInvalid={!!(errors.time && touched.time)}>
                                <RadioGroup
                                    name={'time'}
                                    onChange={(value: any) => setFieldValue('time', value as string)}
                                    onBlur={handleBlur}
                                    value={values.time}
                                >
                                    {AvailableHours.map((value) => (
                                        <Radio key={value} value={value} isDisabled={!checkIfHourIsAvailable(value, values.date)}>
                                            {value}
                                        </Radio>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <Button
                                width={'full'}
                                type={'submit'}
                                isDisabled={isSubmitting || !isValid}
                                isLoading={isSubmitting}
                                onClick={() => handleSubmit()}
                            >
                                SAVE
                            </Button>
                        </form>
                    );
                }}
            </Formik>
        </Flex>
    );
};
