import { useState, useEffect, useRef, useCallback } from "react";
import { CityProps, ForecastDataProps } from "@/types";
import { mapResponseToData } from "@/helpers";

function useForecast () {
  const [city, setCity] = useState<string>("");
  const [listOfCities, setListOfCities] = useState<[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityProps | null>(null);
  const [forecast, setForecast] = useState<ForecastDataProps | null>(null);

  function getListOfCities (data: string) {
    setLoading(true);
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${data.trim()}&count=6`
    )
      .then((res) => res.json())
      .then((data) => setListOfCities(data.results || []))
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  }

  const cache = useRef(new Map());
  const getForecast = useCallback((city: CityProps) => {
    if (cache.current.has(city.name)) {
      setForecast(cache.current.get(city.name));
      return;
    }

    fetch(
      `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${city.latitude}&longitude=${city.longitude}` +
        `&daily=sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min` +
        `&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,wind_direction_10m,wind_gusts_10m,pressure_msl,cloud_cover` +
        `&timezone=auto`
    )
      .then((res) => res.json())
      .then((data) => {
        const mappedData = mapResponseToData(data);
        cache.current.set(city.name, mappedData);
        setForecast(mappedData);
      })
      .catch((e) => console.log(e));
  }, [city])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setCity(value);

    if (value !== "") {
      getListOfCities(value);
    }
  }

  const handleSelectedCity = (city: CityProps) => {
    setSelectedCity(city);
    getForecast(city);
  }

  useEffect(() => {
    if (selectedCity) {
      setCity(selectedCity.name);
      setListOfCities([]);
    }
  }, [selectedCity]);

  const handleReset = () => {
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
    loading,
    handleInputChange,
    handleReset,
    handleSelectedCity,
  };
}

export default useForecast;
