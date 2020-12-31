import * as React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import {AppRouter} from './routing/AppRouter';
import {theme} from './globalTheme/theme';

export const App = () => (
    <ChakraProvider theme={theme}>
        <AppRouter />
    </ChakraProvider>
);
