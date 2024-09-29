export interface SearchProps {
  city: string;
  listOfCities: [];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectedCity: (city: CityProps) => void;
  handleReset: (e: React.MouseEvent<HTMLButtonElement>) => void;
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