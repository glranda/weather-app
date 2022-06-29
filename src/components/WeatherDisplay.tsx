import { Clock } from "./Clock";
import { Display } from "./Display";
import { BottomBar } from "./BottomBar";
import type { WeatherData, WeatherProps } from "../componentProps/WeatherProps.type";

export function WeatherDisplay({ data } : WeatherProps) {
  const { location, current }: WeatherData = data
  return (
    <div className={"w100pc h100pc ma por f fdc jcsb ofh"}>
      <Clock>
        <div className="pb03 ft12">{location.localtime}</div>
        <div className="cGray ft10">Data last updated: {current.last_updated}</div>
      </Clock>
      <Display>
        <div className="f fdc aic">
          <div className="ft50 ml30">{current.temp_f} &deg;</div>
          <div className="pt1 f aic jcc">
            <img className="pr05" src={`${current.condition.icon}`} alt={`Current Condition: ${current.condition.text}`} />
            <span className="ttc">&mdash;&nbsp; {current.condition.text}, {current.is_day === 1 ? "Day" : "Night"}</span>
          </div>
        </div>
        <div className="f w90pc jcsa cGray ftBold ft14 mt2 bt bw1 bcLightGray pt1">
          <span className="tac">Feels like: <br/>{current.feelslike_f} &deg;</span>
          <span className="tac">Humidity: <br/>{current.humidity} &deg;</span>
          <span className="tac">Wind: <br/>{current.gust_mph}mph</span>
        </div>
      </Display>
      <BottomBar>
        <div className="pb03 ft16">{location.name}, {location.region}</div>
        <div className="cGray ft12">{location.country}</div>
      </BottomBar>
    </div>
  )
}
