import {extendTheme} from '@chakra-ui/react';

export const colors = {
    green: '#0ECC21',
    red: '#EB0000',
    yellow: '#E3992B',
    purple: '#8000FF',
    darkgray: '#454545',
    white: 'white',
};

export const Container = {
    variants: {
        'car-card': {
            border: '2px',
            borderColor: '#8000FF',
            padding: '10px',
            borderRadius: '8px',
            margin: '20px',
        },
    },
};

export const Button = {
    baseStyle: {
        fontWeight: 'bold',
    },
    variants: {
        outline: {
            border: '2px solid',
            borderColor: colors.purple,
        },
        solid: {
            bg: colors.purple,
            color: colors.white,
            _hover: {bg: colors.purple},
        },
    },
    defaultProps: {
        size: 'md',
        variant: 'solid',
    },
};

export const theme = extendTheme({
    components: {
        Container,
        Button,
    },
    colors,
});
