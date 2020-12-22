import React from 'react';
import {Box, Grid, Text, VStack} from "@chakra-ui/react";
import {ColorModeSwitcher} from "../../components/ColorModeSwitcher";
import {Logo} from "../../components/Logo";
import {useWeather} from "../../hooks/useWeather";
import {useInit} from '../../../common/hooks/useInit';

const StartPageView: React.FC = () => {
    const {weather, fetchWeather} = useWeather();

    useInit(fetchWeather);

    return (
        <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={3}>
                <ColorModeSwitcher justifySelf="flex-end"/>
                <VStack spacing={8}>
                    <Logo h="40vmin" pointerEvents="none"/>
                </VStack>
                <Text>Fetched from api</Text>
                {weather?.map(item => <Box key={item.date}>{item.date} {item.temperatureC} C</Box>)}
            </Grid>
        </Box>
    );
};

export default StartPageView;