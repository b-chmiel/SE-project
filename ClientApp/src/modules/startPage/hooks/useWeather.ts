import {useState} from "react";
import {WeatherInfo} from "../api/weatherAPI.types";
import {getWeather} from "../api/weatherAPI";

export function useWeather() {
    const [weather, setWeather] = useState<WeatherInfo[] | null>(null);
    const [isFetching, setFetching] = useState(false);

    async function fetchWeather(): Promise<boolean> {
        setFetching(true);

        const weatherInfo = await getWeather();
        if (weatherInfo !== null) {
            setWeather(weatherInfo);
            setFetching(false);
            return true;
        }
        setFetching(false);
        return false;
    }

    return {isFetching, weather, fetchWeather};
}