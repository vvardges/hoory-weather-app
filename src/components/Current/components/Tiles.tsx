import { ForecastCurrentElementProps } from "@/types";
import { getTilesBlueprint } from "@/helpers";

import Tile from "./Tile";

interface ForecastTilesSectionProps {
  today: ForecastCurrentElementProps;
}

export default function Tiles ({ today }: ForecastTilesSectionProps) {
  return (
    <section className="grid grid-cols-2 gap-3 mt-3  items-center justify-items-center overflow-scroll max-h-[260px]">
      {getTilesBlueprint(today).map((tile, index) => {
        return (
          <Tile
            key={index}
            icon={tile.icon}
            title={tile.title}
            info={tile.info}
            description={tile.description}
          />
        );
      })}
    </section>
  );
}
