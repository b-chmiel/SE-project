import React from 'react';

//@ts-ignore
export const withField = (Component) => ({field, form, ...props}) => <Component {...field} {...form} {...props} />;

// Copied from
// https://codesandbox.io/s/react-formik-yup-custom-component-qwsec
// https://rajeshnaroth.medium.com/managing-nested-forms-gracefully-with-formik-a7ed35788653
