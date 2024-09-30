import { ForecastCurrentElementProps } from "@/types";
import { ForecastTileProps } from "@/components/Current/components/Tile";

interface DayNight {
  description: string;
  image: string;
}

interface WeatherData {
  [key: string]: {
    day: DayNight;
    night: DayNight;
  };
}

export function formatDateToHoursAndMinutes (DateString: string) {
  const date = new Date(DateString);
  let hours = date.getHours().toString();
  let minutes = date.getMinutes().toString();

  if (hours.length <= 1) hours = `0${hours}`;
  if (minutes.length <= 1) minutes = `0${minutes}`;

  return `${hours}:${minutes}`;
}

export const formatDateToWeekday = (date: string) =>
  new Date(date).toLocaleDateString('en-US', { weekday: 'short' });

export function getHumidityDescription (level: number) {
  switch (true) {
  case level <= 55:
    return "Dry and comfortable.";
  case level > 55 && level < 65:
    return `Slightly uncomfortable.`;
  case level >= 65:
    return "Lots of moisture, uncomfortable.";
  default:
    break;
  }
}

export function getPrecipitationDescription (pop: number) {
  switch (true) {
  case pop < 0.2:
    return "No chance, ";
  case pop >= 0.2 && pop < 0.3:
    return "Slight chance, ";
  case pop >= 0.3 && pop < 0.6:
    return "A chance, ";
  case pop >= 0.6 && pop < 0.7:
    return "Likely, ";
  case pop >= 0.7:
    return "Most likely, ";
  default:
    break;
  }
}

export function getPressureDescription (pressure: number) {
  const standardPressureValue = 1013;

  return pressure > standardPressureValue ? "High pressure." : "Low pressure.";
}

export function getWindDirection (degree: number) {
  switch (true) {
  case degree === 360:
    return "N";
  case degree === 90:
    return "E";
  case degree === 180:
    return "S";
  case degree === 270:
    return "W";
  case degree > 0 && degree < 90:
    return "NE";
  case degree > 90 && degree < 180:
    return "SE";
  case degree > 180 && degree < 270:
    return "SW";
  case degree > 270 && degree < 360:
    return "NW";
  default:
    break;
  }
}

export function getSubjectiveTemp (feelsLike: number, temp: number) {
  return feelsLike < temp ? "Feels colder." : "Feels warmer.";
}

export function getTilesBlueprint (
  today: ForecastCurrentElementProps
):ForecastTileProps[] {
  return [
    {
      icon: "wind",
      title: "wind",
      info: `${Math.round(today.wind.speed)} km/h ${getWindDirection(
        today.wind.deg
      )}`,
      description: `Gust ${today.wind.gust.toFixed(1)} km/h.`,
    },
    {
      icon: "pressure",
      title: "pressure",
      info: `${today.main.pressure} hPa`,
      description: `${getPressureDescription(today.main.pressure)}`,
    },
    {
      icon: "humidity",
      title: "humidity",
      info: `${today.main.humidity}%`,
      description: `${getHumidityDescription(today.main.humidity)}`,
    },
    {
      icon: "precipitation",
      title: "precipitation",
      info: `${Math.round(today.pop * 100)}%`,
      description: `${getPrecipitationDescription(today.pop)} clouds at ${
        today.clouds
      }%.`,
    },
  ];
}

export const mapResponseToData = (data: { daily: { time: string[]; temperature_2m_max: any[]; temperature_2m_min: any[]; weather_code: any[]; sunrise: any[]; sunset: any[]; }; current: { wind_speed_10m: any; wind_gusts_10m: any; wind_direction_10m: any; pressure_msl: any; relative_humidity_2m: any; temperature_2m: any; precipitation: any; cloud_cover: any; }; }) => {
  const list = data.daily.time.map((date: string, index: number) => {
    return {
      dt: date,
      main: {
        temp_max: data.daily.temperature_2m_max[index],
        temp_min: data.daily.temperature_2m_min[index],
      },
      code: data.daily.weather_code[index],
    };
  });
  const current = {
    sunrise: data.daily.sunrise[0],
    sunset: data.daily.sunset[0],
    wind: {
      speed: data.current.wind_speed_10m,
      gust: data.current.wind_gusts_10m,
      deg: data.current.wind_direction_10m,
    },
    main: {
      pressure: data.current.pressure_msl,
      humidity: data.current.relative_humidity_2m,
      temp: data.current.temperature_2m,
      temp_max: data.daily.temperature_2m_max[0],
      temp_min: data.daily.temperature_2m_min[0],
    },
    pop: data.current.precipitation,
    clouds: data.current.cloud_cover,
  }
  return { list, current };
}

export const mapIconToCode: WeatherData = {
  "0":{
    "day":{
      "description":"Sunny",
      "image":"http://openweathermap.org/img/wn/01d@2x.png"
    },
    "night":{
      "description":"Clear",
      "image":"http://openweathermap.org/img/wn/01n@2x.png"
    }
  },
  "1":{
    "day":{
      "description":"Mainly Sunny",
      "image":"http://openweathermap.org/img/wn/01d@2x.png"
    },
    "night":{
      "description":"Mainly Clear",
      "image":"http://openweathermap.org/img/wn/01n@2x.png"
    }
  },
  "2":{
    "day":{
      "description":"Partly Cloudy",
      "image":"http://openweathermap.org/img/wn/02d@2x.png"
    },
    "night":{
      "description":"Partly Cloudy",
      "image":"http://openweathermap.org/img/wn/02n@2x.png"
    }
  },
  "3":{
    "day":{
      "description":"Cloudy",
      "image":"http://openweathermap.org/img/wn/03d@2x.png"
    },
    "night":{
      "description":"Cloudy",
      "image":"http://openweathermap.org/img/wn/03n@2x.png"
    }
  },
  "45":{
    "day":{
      "description":"Foggy",
      "image":"http://openweathermap.org/img/wn/50d@2x.png"
    },
    "night":{
      "description":"Foggy",
      "image":"http://openweathermap.org/img/wn/50n@2x.png"
    }
  },
  "48":{
    "day":{
      "description":"Rime Fog",
      "image":"http://openweathermap.org/img/wn/50d@2x.png"
    },
    "night":{
      "description":"Rime Fog",
      "image":"http://openweathermap.org/img/wn/50n@2x.png"
    }
  },
  "51":{
    "day":{
      "description":"Light Drizzle",
      "image":"http://openweathermap.org/img/wn/09d@2x.png"
    },
    "night":{
      "description":"Light Drizzle",
      "image":"http://openweathermap.org/img/wn/09n@2x.png"
    }
  },
  "53":{
    "day":{
      "description":"Drizzle",
      "image":"http://openweathermap.org/img/wn/09d@2x.png"
    },
    "night":{
      "description":"Drizzle",
      "image":"http://openweathermap.org/img/wn/09n@2x.png"
    }
  },
  "55":{
    "day":{
      "description":"Heavy Drizzle",
      "image":"http://openweathermap.org/img/wn/09d@2x.png"
    },
    "night":{
      "description":"Heavy Drizzle",
      "image":"http://openweathermap.org/img/wn/09n@2x.png"
    }
  },
  "56":{
    "day":{
      "description":"Light Freezing Drizzle",
      "image":"http://openweathermap.org/img/wn/09d@2x.png"
    },
    "night":{
      "description":"Light Freezing Drizzle",
      "image":"http://openweathermap.org/img/wn/09n@2x.png"
    }
  },
  "57":{
    "day":{
      "description":"Freezing Drizzle",
      "image":"http://openweathermap.org/img/wn/09d@2x.png"
    },
    "night":{
      "description":"Freezing Drizzle",
      "image":"http://openweathermap.org/img/wn/09n@2x.png"
    }
  },
  "61":{
    "day":{
      "description":"Light Rain",
      "image":"http://openweathermap.org/img/wn/10d@2x.png"
    },
    "night":{
      "description":"Light Rain",
      "image":"http://openweathermap.org/img/wn/10n@2x.png"
    }
  },
  "63":{
    "day":{
      "description":"Rain",
      "image":"http://openweathermap.org/img/wn/10d@2x.png"
    },
    "night":{
      "description":"Rain",
      "image":"http://openweathermap.org/img/wn/10n@2x.png"
    }
  },
  "65":{
    "day":{
      "description":"Heavy Rain",
      "image":"http://openweathermap.org/img/wn/10d@2x.png"
    },
    "night":{
      "description":"Heavy Rain",
      "image":"http://openweathermap.org/img/wn/10n@2x.png"
    }
  },
  "66":{
    "day":{
      "description":"Light Freezing Rain",
      "image":"http://openweathermap.org/img/wn/10d@2x.png"
    },
    "night":{
      "description":"Light Freezing Rain",
      "image":"http://openweathermap.org/img/wn/10n@2x.png"
    }
  },
  "67":{
    "day":{
      "description":"Freezing Rain",
      "image":"http://openweathermap.org/img/wn/10d@2x.png"
    },
    "night":{
      "description":"Freezing Rain",
      "image":"http://openweathermap.org/img/wn/10n@2x.png"
    }
  },
  "71":{
    "day":{
      "description":"Light Snow",
      "image":"http://openweathermap.org/img/wn/13d@2x.png"
    },
    "night":{
      "description":"Light Snow",
      "image":"http://openweathermap.org/img/wn/13n@2x.png"
    }
  },
  "73":{
    "day":{
      "description":"Snow",
      "image":"http://openweathermap.org/img/wn/13d@2x.png"
    },
    "night":{
      "description":"Snow",
      "image":"http://openweathermap.org/img/wn/13n@2x.png"
    }
  },
  "75":{
    "day":{
      "description":"Heavy Snow",
      "image":"http://openweathermap.org/img/wn/13d@2x.png"
    },
    "night":{
      "description":"Heavy Snow",
      "image":"http://openweathermap.org/img/wn/13n@2x.png"
    }
  },
  "77":{
    "day":{
      "description":"Snow Grains",
      "image":"http://openweathermap.org/img/wn/13d@2x.png"
    },
    "night":{
      "description":"Snow Grains",
      "image":"http://openweathermap.org/img/wn/13n@2x.png"
    }
  },
  "80":{
    "day":{
      "description":"Light Showers",
      "image":"http://openweathermap.org/img/wn/09d@2x.png"
    },
    "night":{
      "description":"Light Showers",
      "image":"http://openweathermap.org/img/wn/09n@2x.png"
    }
  },
  "81":{
    "day":{
      "description":"Showers",
      "image":"http://openweathermap.org/img/wn/09d@2x.png"
    },
    "night":{
      "description":"Showers",
      "image":"http://openweathermap.org/img/wn/09n@2x.png"
    }
  },
  "82":{
    "day":{
      "description":"Heavy Showers",
      "image":"http://openweathermap.org/img/wn/09d@2x.png"
    },
    "night":{
      "description":"Heavy Showers",
      "image":"http://openweathermap.org/img/wn/09n@2x.png"
    }
  },
  "85":{
    "day":{
      "description":"Light Snow Showers",
      "image":"http://openweathermap.org/img/wn/13d@2x.png"
    },
    "night":{
      "description":"Light Snow Showers",
      "image":"http://openweathermap.org/img/wn/13n@2x.png"
    }
  },
  "86":{
    "day":{
      "description":"Snow Showers",
      "image":"http://openweathermap.org/img/wn/13d@2x.png"
    },
    "night":{
      "description":"Snow Showers",
      "image":"http://openweathermap.org/img/wn/13n@2x.png"
    }
  },
  "95":{
    "day":{
      "description":"Thunderstorm",
      "image":"http://openweathermap.org/img/wn/11d@2x.png"
    },
    "night":{
      "description":"Thunderstorm",
      "image":"http://openweathermap.org/img/wn/11n@2x.png"
    }
  },
  "96":{
    "day":{
      "description":"Light Thunderstorms With Hail",
      "image":"http://openweathermap.org/img/wn/11d@2x.png"
    },
    "night":{
      "description":"Light Thunderstorms With Hail",
      "image":"http://openweathermap.org/img/wn/11n@2x.png"
    }
  },
  "99":{
    "day":{
      "description":"Thunderstorm With Hail",
      "image":"http://openweathermap.org/img/wn/11d@2x.png"
    },
    "night":{
      "description":"Thunderstorm With Hail",
      "image":"http://openweathermap.org/img/wn/11n@2x.png"
    }
  }
}
