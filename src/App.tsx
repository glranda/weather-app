import { useEffect, useState } from "react";
import { WeatherDisplay } from "./components/WeatherDisplay";
import { LoadingIcon } from "./components/LoadingIcon";
import "./styles.css";

function Container() {
  const [data, setData] = useState<any>([])

  useEffect(() => {
    fetchcurrentWeather()
  }, [])

  function getLongAndLat() {
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
  
  async function fetchcurrentWeather() {
    try {
      const position: any = await getLongAndLat(),
      { coords } = position,
      url = `https://api.weatherapi.com/v1/current.json?key=d5b70fe190b04b6192a143809221306&q=${coords.latitude},${coords.longitude}`
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          const body = document.body;
          body.classList.add("ofh");
          data.current.is_day === 1 ? body.setAttribute("data-theme", "lightMode") : body.setAttribute("data-theme", "darkMode")
          setData(data)
        })
        .catch(e => console.log(e))
    } catch(e: unknown) {
      if (e instanceof Error) {
        return {
          message: `Things exploded (${e.message})`,
        }
      }
    }
  }

  return (
    <div className="ofh pr1 pl1 h100pc weatherApp" data-testid="weatherApp">
      {(data.length !== 0) ? (
        <WeatherDisplay d={data} theme={data.current.is_day}/>
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
