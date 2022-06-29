import { useEffect, useState } from "react";
import { WeatherDisplay } from "./components/WeatherDisplay";
import { LoadingIcon } from "./components/LoadingIcon";
import type { PostionProps } from "./componentProps/PostionProps.type";
import "./styles.css";

function Container() {
  const [weather, setData] = useState<any>([])
  const [theme, setTheme] = useState<string>("")

  useEffect(() => {
    fetchCurrentWeather()
  }, [weather, theme])

  function getCoordinates() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.watchPosition(function(position) {
        console.log(position)
      },
      function(error) {
        if (error.code === error.PERMISSION_DENIED) {
          alert("Please turn on Location Services to use this app!")
        }
      });
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }
  
  async function fetchCurrentWeather() {
    try {
      const position: PostionProps | any = await getCoordinates(),
      url = `https://api.weatherapi.com/v1/current.json?key=d5b70fe190b04b6192a143809221306&q=${position.coords.latitude},${position.coords.longitude}`
      const fetchUrl = await fetch(url),
      weatherData = await fetchUrl.json()
      weatherData.current.is_day === 1 ? setTheme("lightMode") : setTheme("darkMode")
      setData(weatherData)
    } catch(e: unknown) {
      if (e instanceof Error) {
        return {
          message: `Unable to fetch current weather data: ${e.message}`
        }
      }
    }
  }

  return (
    <div className="ofh pr1 pl1 h100pc weatherApp" data-testid="weatherApp" data-theme={theme}>
      {(weather.length !== 0) ? (
        <WeatherDisplay data={weather} theme={weather.current.is_day} />
      ): (
        <LoadingIcon />
      )}
    </div>
  )
}

function App() {
  return <Container />
}

export default App;
