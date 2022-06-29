type Condition = {
  icon: string,
  text: string
}
type Current = {
  feelslike_f: number,
  humidity: number,
  gust_mph: number,
  temp_f: number,
  last_updated: string,
  is_day: number,
  condition: Condition
}
type Location = {
  localtime: string,
  name: string,
  region: string,
  country: string
}
export interface WeatherData {
  current: Current,
  location: Location
}
export interface WeatherProps {
  data: WeatherData
}