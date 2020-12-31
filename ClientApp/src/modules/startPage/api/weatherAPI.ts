import axios from 'axios';
import {WeatherInfo} from './weatherAPI.types';

export function getWeather(): Promise<WeatherInfo[] | null> {
    return axios
        .get('weatherforecast')
        .then((response) => response.data)
        .catch(() => null);
}
