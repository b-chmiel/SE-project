import {ChakraProvider} from '@chakra-ui/react';
import * as React from 'react';
import {theme} from './globalTheme/theme';
import {AuthProvider} from './modules/authorization/context/AuthProvider';
import {AppRouter} from './routing/AppRouter';

export const App = () => (
    <ChakraProvider theme={theme}>
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    </ChakraProvider>
);
