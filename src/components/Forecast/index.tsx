import { ForecastDataProps } from "@/types";

import Item from "@/components/Forecast/components/Item";

interface ForecastIntervalsSectionProps {
  forecastData: ForecastDataProps;
}

export default function Forecast ({
  forecastData,
}: ForecastIntervalsSectionProps) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-7 mb-10 pt-1 mt-4 dark:text-neutral-200 dark:bg-neutral-700/25 dark:rounded-md gap-2 flex-sm-col">
      {forecastData.list.map((item, i) => {
        return (
          <Item forecastIntervalData={item} key={i} />
        );
      })}
    </section>
  );
}
