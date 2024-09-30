import { CityProps, ForecastCurrentElementProps } from "@/types";

import Degree from "@/components/Degree";

interface ForecastHeaderProps {
  today: ForecastCurrentElementProps;
  selectedCity: CityProps;
}

export default function Header ({ today, selectedCity }: ForecastHeaderProps) {
  return (
    <section className="text-center">
      <h2 className="text-xl font-medium text-neutral-900  dark:text-neutral-200">
        {selectedCity.name}
        <span className="font-thin dark:font-extrathin">
          ,{selectedCity.country}
        </span>
      </h2>
      <h1 className="text-4xl font-medium text-neutral-900 dark:text-neutral-200">
        <Degree temp={Math.round(today.main.temp)} />
      </h1>
      <p className="text-xs text-neutral-800 dark:text-neutral-300">
        from <Degree temp={Math.floor(today.main.temp_min)} /> to{" "}
        <Degree temp={Math.ceil(today.main.temp_max)} />
      </p>
    </section>
  );
}
