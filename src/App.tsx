import React, { useEffect, useState } from "react";
import { Clock, Display, BottomBar } from "./components";
import type { WeatherProps } from "./WeatherProps.type";
import "./styles.css";

function WeatherDisplay(d: WeatherProps) {
  const modes = d.d.current.is_day
  return (
    <div className={`w90vw h90vh ma por ${modes === 1 ? `lightMode` : `darkMode`}`}>
      <Clock>
        <div className="pb03 ft12">{d.d.location.localtime}{modes === 1 ? "pm" : "am"}</div>
        <div className="cGray ft10">Data last updated: {d.d.current.last_updated}{modes === 1 ? "pm" : "am"}</div>
      </Clock>
      <Display>
        <>
          <div className="f fdc aic">
            <div className="ft50">{d.d.current.temp_f} &deg;</div>
            <div className="pt1 f aic jcc">
              <img className="pr05" src={`${d.d.current.condition.icon}`} alt={`Current Condition: ${d.d.current.condition.text}`} />
              <span className="ttc">&mdash;&nbsp; {d.d.current.condition.text}, {modes === 1 ? "Day" : "Night"}</span>
            </div>
          </div>
          <div className="f w90pc jcsa cGray ftBold ft14 mt2 bt bw1 bcLightGray pt1">
            <span className="tac">Feels like: <br/>{d.d.current.feelslike_f} &deg;</span>
            <span className="tac">Humidity: <br/>{d.d.current.humidity} &deg;</span>
            <span className="tac">Wind: <br/>{d.d.current.gust_mph}mph</span>
          </div>
        </>
      </Display>
      <BottomBar>
        <div className="tac">
          <div className="pb03 ft16">{d.d.location.name}, {d.d.location.region}</div>
          <div className="cGray ft12">{d.d.location.country}</div>
        </div>
      </BottomBar>
    </div>
  )
}

function LoadingIcon() {
  return (
    <div className="mt2 f jcc fdc aic">
      <p>Loading Location...</p>
      <span className="pb1 alert"></span>
      <img className="w140px icon" src={require('./spinning.png')} />
    </div>
  )
}

function Container() {
  const [data, setData] = useState<any>([])

  useEffect(() => {
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

    const fetchcurrentWeather = async () => {
      try {
        const position: any = await getLongAndLat(),
        { coords } = position,
        url = `https://api.weatherapi.com/v1/current.json?key=d5b70fe190b04b6192a143809221306&q=${coords.latitude},${coords.longitude}`
        await fetch(url)
          .then(response => response.json())
          .then(data => {
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
    fetchcurrentWeather()
  }, [])
  //

  return (
    <div className="weatherApp ofh">
      {(data.length !== 0) ? (
        <WeatherDisplay d={data}/>
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
