import { useState, useEffect } from "react";
import { CityProps, ForecastDataProps } from "@/types";

function useForecast() {
  const [city, setCity] = useState<string>("");
  const [listOfCities, setListOfCities] = useState<[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityProps | null>(null);
  const [forecast, setForecast] = useState<ForecastDataProps | null>(null);

  function getListOfCities(data: string) {
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${data.trim()}&count=6`
    )
      .then((res) => res.json())
      .then((data) => setListOfCities(data.results || []))
      .catch((e) => console.log(e));
  }

  function getForecast(data: CityProps) {
    fetch(
      `https://api.open-meteo.com/v1/forecast`+
            `?latitude=${data.latitude}&longitude=${data.longitude}`+
            `&daily=sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min`+
            `&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,wind_direction_10m,wind_gusts_10m,pressure_msl,cloud_cover`+
            `&timezone=auto`
    )
      .then((res) => res.json())
      .then((data) => {
        const list = data.daily.time.map((date: string, index: number) => {
          return {
            dt: date,
            main: {
              temp_max: data.daily.temperature_2m_max[index],
              temp_min: data.daily.temperature_2m_min[index],
            },
            code: data.daily.weather_code[index],
          };
        });
        const current = {
          sunrise: data.daily.sunrise[0],
          sunset: data.daily.sunset[0],
          wind: {
            speed: data.current.wind_speed_10m,
            gust: data.current.wind_gusts_10m,
            deg: data.current.wind_direction_10m,
          },
          main: {
            pressure: data.current.pressure_msl,
            humidity: data.current.relative_humidity_2m,
            temp: data.current.temperature_2m,
            temp_max: data.daily.temperature_2m_max[0],
            temp_min: data.daily.temperature_2m_min[0],
          },
          pop: data.current.precipitation,
          clouds: data.current.cloud_cover,
        }
        setForecast({list, current});
      })
      .catch((e) => console.log(e));
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setCity(value);

    if (value !== "") {
      getListOfCities(value);
    }
  }

  function handleSelectedCity(city: CityProps) {
    setSelectedCity(city);
    getForecast(city);
  }

  useEffect(() => {
    if (selectedCity) {
      setCity(selectedCity.name);
      setListOfCities([]);
    }
  }, [selectedCity]);

  function handleReset() {
    setCity("");
    setListOfCities([]);
    setForecast(null);
    setSelectedCity(null);
  }

  return {
    city,
    selectedCity,
    listOfCities,
    forecast,
    handleInputChange,
    handleReset,
    handleSelectedCity,
  };
}

export default useForecast;
