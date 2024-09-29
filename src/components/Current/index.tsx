import {CityProps, ForecastDataProps} from "@/types";

import Header from "@/components/Current/components/Header";
import SunriseSunset from "@/components/Current/components/SunriseSunset";
import Tiles from "@/components/Current/components/Tiles";

export interface ForecastProps {
  forecastData: ForecastDataProps;
  selectedCity: CityProps;
}

export default function Current({ forecastData, selectedCity }: ForecastProps) {
  const {current} = forecastData;
  return (
    <div className="mb-5 mt-10">
      <Header today={current} selectedCity={selectedCity}/>
      <SunriseSunset today={current}/>
      <Tiles today={current}/>
    </div>
  );
}
