import { SearchProps } from "@/types";

import SearchIcon from "@/components/Icons/SearchIcon";
import ResetIcon from "@/components/Icons/ResetIcon";

type SearchInputType = Omit<SearchProps, "listOfCities" | "handleSelectedCity" | "loading">;

export default function Input ({
  city,
  handleInputChange,
  handleReset,
}: SearchInputType) {
  return (
    <form className="relative flex items-center justify-center w-[250px]">
      <label
        id="search-label"
        htmlFor="search-input"
        className="absolute left-2"
      >
        <SearchIcon />
      </label>

      <input
        id="search-input"
        aria-labelledby="search-label"
        className="w-full capitalize text-sm font-medium outline-none placeholder:text-neutral-500 placeholder:normal-case placeholder:font-thin border border-none bg-neutral-200 hover:bg-neutral-200/70 rounded-md py-2 pl-9 pr-20 focus:text-neutral-800 dark:bg-neutral-700 dark:hover:bg-neutral-700/80 dark:text-neutral-300 dark:border-none dark:outline-none dark:placeholder:text-neutral-400 cursor-pointer"
        placeholder="Search for the city..."
        type="text"
        name="search"
        value={city}
        onChange={handleInputChange}
      />
      {city ? (
        <button
          type="reset"
          title="Clear the query"
          className="absolute right-2"
          onClick={handleReset}
        >
          <ResetIcon />
        </button>
      ) : (
        <button
          type="reset"
          title="Clear the query"
          className="absolute right-2 hidden"
          onClick={handleReset}
        >
          <ResetIcon />
        </button>
      )}
    </form>
  );
}
