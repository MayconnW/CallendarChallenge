export type CityApi = {
  hits: {
    nombre: string;
    id: number;
    lang: 'pt';
    url: string;
    jerarquia: string[];
    pais: number;
    index: boolean;
    bandera: string; // I have no idea how to use it lol '🇧🇷';
    puntuacion: number;
    clicks: number;
    nivel: number;
  }[];
}

export type City = {
  value: string;
  label: string;
}

export type WeatherApi = {
  daily: {
    dt: number;
    weather: {
      description: string;
      icon: string;
    }[];
  }[];
}

export type WeatherByDay = {
  date: Date;
  description: string;
  iconName: string;
}
