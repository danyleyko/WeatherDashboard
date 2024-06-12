import './WeatherDisplay.css';
import { Weather } from './types';

function WeatherDisplay({ weather }: { weather: Weather }): JSX.Element {
  return (
    <div className="weather-display">
      <h1>{weather.city}</h1>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Wind Speed: {weather.windSpeed} m/s</p>
      <p>Condition: {weather.condition}</p>
      <p>Country: {weather.country}</p>
    </div>
  );
}

export default WeatherDisplay;