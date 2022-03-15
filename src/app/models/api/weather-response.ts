import {Weather} from "./weather";

export interface WeatherResponse {
  weather: Weather[];
  main: {temp: number; feels_like: number}
}
