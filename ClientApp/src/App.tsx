import * as React from "react"
import {ChakraProvider, theme,} from "@chakra-ui/react"
import {AppRouter} from "./routing/AppRouter";

export const App = () => (
    <ChakraProvider theme={theme}>
        <AppRouter/>
    </ChakraProvider>
)
