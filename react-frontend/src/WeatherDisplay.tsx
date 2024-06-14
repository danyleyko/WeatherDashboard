import './WeatherDisplay.css';
import { Weather } from './types';
import { getTranslatedCountryName } from './utils';

const WeatherDisplay: React.FC<{ weather: Weather, lang: string }> = ({ weather, lang }) => 
{
  // Translating menu labels
  const translateLabel = (city: string) => {
    switch (city) {
      case 'Temperature':
        return lang === 'fr' ? 'Température' :
               lang === 'es' ? 'Temperatura' :
               lang === 'de' ? 'Temperatur' :
               lang === 'ua' ? 'Температура' :
               lang === 'ru' ? 'Температура' :
               lang === 'cz' ? 'Teplota' :
               'Temperature';
      case 'Humidity':
        return lang === 'fr' ? 'Humidité' :
               lang === 'es' ? 'Humedad' :
               lang === 'de' ? 'Luftfeuchtigkeit' :
               lang === 'ua' ? 'Вологість' :
               lang === 'ru' ? 'Влажность' :
               lang === 'cz' ? 'Vlhkost' :
               'Humidity';
      case 'Wind Speed':
        return lang === 'fr' ? 'Vitesse du vent' :
               lang === 'es' ? 'Velocidad del viento' :
               lang === 'de' ? 'Windgeschwindigkeit' :
               lang === 'ua' ? 'Швидкість вітру' :
               lang === 'ru' ? 'Скорость ветра' :
               lang === 'cz' ? 'Rychlost větru' :
               'Wind Speed';
      case 'Condition':
        return lang === 'fr' ? 'Condition' :
               lang === 'es' ? 'Condición' :
               lang === 'de' ? 'Bedingung' :
               lang === 'ua' ? 'Стан' :
               lang === 'ru' ? 'Состояние' :
               lang === 'cz' ? 'Stav' :
               'Condition';
      case 'Country':
        return lang === 'fr' ? 'Pays' :
               lang === 'es' ? 'País' :
               lang === 'de' ? 'Land' :
               lang === 'ua' ? 'Країна' :
               lang === 'ru' ? 'Страна' :
               lang === 'cz' ? 'Země' :
               'Country';
      default:
        return city;
    }
  };

  return (
    <div className="weather-display">

      <h1 className="weather-info">{weather.city}</h1>

      <p className="weather-info">{translateLabel('Temperature')}: {weather.temperature}°C</p>
      <p className="weather-info">{translateLabel('Humidity')}: {weather.humidity}%</p>
      <p className="weather-info">{translateLabel('Wind Speed')}: {weather.windSpeed} m/s</p>
      <p className="weather-info">{translateLabel('Condition')}: {weather.condition}</p>
      <p className="weather-info">{translateLabel('Country')}: {getTranslatedCountryName(weather.country, lang)}</p>

    </div>
  );
};

export default WeatherDisplay;