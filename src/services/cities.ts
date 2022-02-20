import axios from 'axios';
import { City, CityApi } from './types';

export const getCitiesByName = async (containName: string): Promise<City[]> => {
  const baseUrl = process.env.REACT_APP_METEORED_BASE_URL;
  const headers = { Accept: 'application/json' };
  
  const api = axios.create({
    baseURL: baseUrl,
    headers
  });

  const {
    data: { hits: cities }
  } = await api.get<CityApi>(`/txt/br/pt-BR/${containName}`);

  return Array.from(new Map(cities.map(item => [item.nombre, item])).values())
    .sort((a, b) => (a.nombre > b.nombre ? 1 : -1))
    .map(city => ({
      value: `${city.id}`,
      label: city.nombre
    }));
};

export const getCityCoordinatesByName = async (
  name: string
): Promise<{lat: number, lon: number} | null> => {
  const apiId = process.env.REACT_APP_OPEN_WEATHER_API_ID;
  const baseUrl = process.env.REACT_APP_OPEN_WEATHER_BASE_URL;
  const headers = { Accept: 'application/json' };

  const api = axios.create({
    baseURL: baseUrl,
    headers
  });

  const { data } = await api.get<{lat: number, lon: number}[]>(
    `/geo/1.0/direct?q=${name},br&appid=${apiId}`
  );
  if (data[0]) {
    return {
      lat: data[0].lat,
      lon: data[0].lon
    };
  }

  return null;
};