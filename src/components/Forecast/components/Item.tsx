import { ForecastListElementProps } from "@/types";
import { formatDateToWeekday, mapIconToCode } from "@/helpers";

import Degree from "@/components/Degree";

interface ForecastIntervalProps {
  forecastIntervalData: ForecastListElementProps;
}

export default function Item ({
  forecastIntervalData,
}: ForecastIntervalProps) {
  const mappedIcon = mapIconToCode[forecastIntervalData.code];
  return (
    <div
      className="w-[120px] mb-2 text-center flex-shrink-0 overscroll-contain border rounded-md pt-0.5"
    >
      <p className="text-s font-extralight text-neutral-500 dark:text-neutral-200">
        {formatDateToWeekday(forecastIntervalData.dt)}
      </p>
      <p>
        <img
          src={mappedIcon.day.image}
          alt={mappedIcon.day.description}
        />
      </p>
      <p className="text-xs font-medium pb-2">
        <Degree temp={Math.round(forecastIntervalData.main.temp_min)} />
        {` - `}
        <Degree temp={Math.round(forecastIntervalData.main.temp_max)} />
      </p>
    </div>
  );
}
