import { SearchProps, CityProps } from "@/types";

type SearchListOfCitiesType = Omit<
  SearchProps,
  "city" | "handleInputChange" | "handleReset"
>;

export default function List ({
  listOfCities,
  handleSelectedCity,
  loading,
}: SearchListOfCitiesType) {
  return (
    <div className="fixed mt-10 text-left">
      {loading ? <div className="max-w-sm animate-pulse">
        {Array(6).fill(null).map((_, i) => (
          <div key={i} className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-56 mt-2"/>
        ))}
      </div> :
        <ul>
          {listOfCities.map((city: CityProps, index: number) => (
            <li key={`${city.name}-${index}`}>
              <button
                type="button"
                className="rounded-md p-1 pl-7 mt-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 focus:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100"
                onClick={() => {
                  handleSelectedCity(city);
                }}
              >
                {`${city.name}, ${city.country}`}
              </button>
            </li>
          ))}
        </ul>}
    </div>
  );
}
