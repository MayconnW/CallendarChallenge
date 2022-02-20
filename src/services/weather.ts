import axios from 'axios';
import { WeatherApi, WeatherByDay } from './types';
import { getCityCoordinatesByName } from './cities';

export const getWeatherByCityName = async (
  cityName: string
): Promise<WeatherByDay[] | null> => {
  const apiId = process.env.REACT_APP_OPEN_WEATHER_API_ID;
  const baseUrl = process.env.REACT_APP_OPEN_WEATHER_BASE_URL;
  const headers = { Accept: 'application/json' };

  const api = axios.create({
    baseURL: baseUrl,
    headers
  });

  const coordinates = await getCityCoordinatesByName(cityName);

  if (!coordinates) {
    return null;
  }

  const {lat, lon} = coordinates;

  const coordinatesParams = `lat=${lat}&lon=${lon}`;
  const extraParams = `lang=en_us&exclude=minutely,hourly&units=metric`;
  const request = `/data/2.5/onecall?${coordinatesParams}&${extraParams}&appid=${apiId}`;

  const {
    data: { daily }
  } = await api.get<WeatherApi>(request);

  if (!daily || daily.length === 0) {
    return null;
  }

  return daily.map(item => ({
    date: new Date(item.dt * 1000),
    description: item.weather[0]?.description ?? '',
    iconName: item.weather[0]?.icon ?? ''
  }));
};