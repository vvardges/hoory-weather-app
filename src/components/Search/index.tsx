import { SearchProps } from "@/types";

import Header from "@/components/Search/components/Header";
import Input from "@/components/Search/components/Input";
import List from "@/components/Search/components/List";

export default function Search({
  city,
  listOfCities,
  handleInputChange,
  handleSelectedCity,
  handleReset,
}: SearchProps) {
  return (
    <section className="w-full md:w-full lg:w-full h-screen flex flex-col text-center items-center justify-center dark:bg-neutral-800">
      <Header />
      <div className="flex mt-5 space-x-2" onSubmit={(e) => e.preventDefault()}>
        <Input
          city={city}
          handleInputChange={handleInputChange}
          handleReset={handleReset}
        />

        <List
          listOfCities={listOfCities}
          handleSelectedCity={handleSelectedCity}
        />
      </div>
    </section>
  );
}
