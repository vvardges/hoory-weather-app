import { useState } from "react";

import useForecast from "@/hooks/useForecast";
import Search from "@/components/Search";
import Forecast from "@/components/Forecast";
import ToggleDarkMode from "@/components/ToggleDarkMode";
import ReturnToSearch from "@/components/ReturnToSearch";
import Footer from "@/components/Footer";
import Current from "@/components/Current";

function App () {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const {
    city,
    selectedCity,
    listOfCities,
    forecast,
    handleInputChange,
    handleSelectedCity,
    handleReset,
  } = useForecast();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="relative w-full h-screen dark:bg-neutral-900">
      <div className={`${darkMode ? "dark" : "light"} flex justify-center items-center`}>
        {forecast && <ReturnToSearch handleReset={handleReset} />}
        <ToggleDarkMode toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        {forecast ? (
          <div className="flex flex-col-reverse md:flex-col justify-center items-center dark:bg-neutral-800 w-full min-h-screen">
            <Forecast forecastData={forecast} />
            {selectedCity && <Current forecastData={forecast} selectedCity={selectedCity}/>}
          </div>
        ) : (
          <Search
            city={city}
            listOfCities={listOfCities}
            handleInputChange={handleInputChange}
            handleSelectedCity={handleSelectedCity}
            handleReset={handleReset}
          />
        )}
      </div>
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
