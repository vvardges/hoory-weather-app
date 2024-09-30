import SunriseIcon from "@/components/Icons/SunriseIcon";
import SunsetIcon from "@/components/Icons/SunsetIcon";
import { ForecastCurrentElementProps } from "@/types";
import { formatDateToHoursAndMinutes } from "@/helpers";

interface ForecastSunriseSunsetSectionProps {
  today: ForecastCurrentElementProps;
}

export default function SunriseSunset ({ today }: ForecastSunriseSunsetSectionProps) {
  return (
    <div className="grid grid-cols-2 pt-3 items-center justify-items-center">
      <div className="text-xs font-medium text-neutral-500 space-y-1 dark:text-neutral-300">
        <p className="grid place-items-center dark:text-neutral-400">
          <SunriseIcon />
        </p>
        <div>{formatDateToHoursAndMinutes(today.sunrise)}</div>
      </div>
      <div className="text-xs font-medium text-neutral-500 space-y-1 dark:text-neutral-300">
        <p className="grid place-items-center dark:text-neutral-400">
          <SunsetIcon />
        </p>
        <div>{formatDateToHoursAndMinutes(today.sunset)}</div>
      </div>
    </div>
  );
}
