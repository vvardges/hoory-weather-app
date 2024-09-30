export interface SearchProps {
  city: string;
  listOfCities: [];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectedCity: (city: CityProps) => void;
  handleReset: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
}

export interface CityProps {
  name: string;
  country: string;
  longitude: number;
  latitude: number;
}

export interface ForecastListElementProps {
  dt: string;
  code: number;
  main: {
    temp_max: number;
    temp_min: number;
  };
}

export interface ForecastCurrentElementProps {
  sunrise: string;
  sunset: string;
  main: {
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  wind: {
    speed: number;
    gust: number;
    deg: number;
  };
  clouds: number;
  pop: number;
}

export interface ForecastDataProps {
  list: ForecastListElementProps[];
  current: ForecastCurrentElementProps;
}

export interface MapResponseToDataParams {
  daily: {
    sunrise: string[];
    sunset: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: string[];
    weather_code: number[];
  };
  current: {
    wind_speed_10m: number;
    wind_gusts_10m: number;
    wind_direction_10m: number;
    pressure_msl: number;
    relative_humidity_2m: number;
    temperature_2m: number;
    precipitation: number;
    cloud_cover: number;
  };
}