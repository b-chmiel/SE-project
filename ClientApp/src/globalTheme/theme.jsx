import {extendTheme} from '@chakra-ui/react';

export const colors = {
    green: '#0ECC21',
    red: '#EB0000',
    yellow: '#E3992B',
    darkgray: '#454545',
    white: 'white',
    electricViolet: '#8000FF', //accent color
    purpleHeart: '#7627C5',
    mediumPurple: '#A96BE7',
    windsor: '#470B84',
};

export const Container = {
    variants: {
        'car-card': {
            border: '2px',
            borderColor: colors.electricViolet,
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
            borderColor: colors.electricViolet,
        },
        solid: {
            bg: colors.electricViolet,
            color: colors.white,
            _hover: {bg: colors.electricViolet},
        },
    },
    defaultProps: {
        size: 'md',
        variant: 'solid',
    },
};

export const Text = {
    baseStyle: {
        fontFamily: 'Roboto',
        size: '24px',
        weight: '400',
    },
};

export const theme = extendTheme({
    components: {
        Container,
        Button,
        Text,
    },
    colors,
});
