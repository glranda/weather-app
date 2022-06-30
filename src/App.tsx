import { useEffect, useState, useCallback } from "react";
import { WeatherDisplay } from "./components/WeatherDisplay";
import { LoadingIcon } from "./components/LoadingIcon";
import type { PostionProps } from "./componentProps/PostionProps.type";
import { WeatherData } from "./componentProps/WeatherProps.type";
import "./styles.css";

function Container() {
  const [weather, setWeather] = useState<WeatherData>();
  const [theme, setTheme] = useState<string>("");

  const getCoordinates = useCallback(async () => {
    const position: PostionProps = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    }
  }, [navigator])

  const fetchCurrentWeather = useCallback(async () => {
    try {
      const position: { longitude: number, latitude: number } = await getCoordinates();
      const url = `https://api.weatherapi.com/v1/current.json?key=d5b70fe190b04b6192a143809221306&q=${position.latitude},${position.longitude}`;
      const fetchUrl = await fetch(url);
      const weatherData = await fetchUrl.json();
      weatherData.current.is_day === 1 ? setTheme("lightMode") : setTheme("darkMode");
      setWeather(weatherData);
    } catch(e) {
      if ((e as Error).message === "User denied Geolocation") {
        alert("Please turn on Location Services to use this app!");
      } else {
        console.log(`Unable to fetch current weather data: ${(e as Error).message}`);
      }
    }
  }, [getCoordinates, setTheme, setWeather]);

  useEffect(() => {
    fetchCurrentWeather();
  }, [fetchCurrentWeather]);

  return (
    <div className="ofh pr1 pl1 h100pc weatherApp" data-testid="weatherApp" data-theme={theme}>
      {weather ? <WeatherDisplay data={weather} /> : <LoadingIcon />}
    </div>
  );
}

function App() {
  return <Container />;
}

export default App;
