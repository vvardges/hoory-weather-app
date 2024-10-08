import FeelsIcon from "@/components/Icons/FeelsIcon";
import HumidityIcon from "@/components/Icons/HumidityIcon";
import PrecipitationIcon from "@/components/Icons/PrecipitationIcon";
import PressureIcon from "@/components/Icons/PressureIcon";
import VisibilityIcon from "@/components/Icons/VisibilityIcon";
import WindIcon from "@/components/Icons/WindIcon";

export interface ForecastTileProps {
  icon:
    | "wind"
    | "feels"
    | "humidity"
    | "pressure"
    | "visibility"
    | "precipitation";
  title: string;
  info: string | JSX.Element;
  description: string | number;
}

const icons = {
  wind: WindIcon,
  feels: FeelsIcon,
  humidity: HumidityIcon,
  pressure: PressureIcon,
  visibility: VisibilityIcon,
  precipitation: PrecipitationIcon,
};

export default function Tile ({
  icon,
  title,
  info,
  description,
}: ForecastTileProps) {
  const Icon = icons[icon];

  return (
    <article className="w-[120px] h-[120px] flex flex-col items-start justify-between bg-neutral-100 rounded-md p-2 dark:bg-neutral-700/25">
      <div className="flex items-center font-extralight justify-center space-x-1 text-neutral-500 dark:text-neutral-400 ">
        <Icon />
        <h4 className="text-xxs font-medium uppercase ">{title}</h4>
      </div>
      <h3 className="text-lg font-medium dark:text-neutral-200">{info}</h3>
      <p className="text-xs  dark:text-neutral-300">{description}</p>
    </article>
  );
}
