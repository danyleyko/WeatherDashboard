import './WeatherDisplay.css';
import { getTranslatedCountryName } from '../utilities/utils';
import React from 'react';

export interface Weather 
{
    city: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    country: string;
    lang: string;
}

const translations: { [key: string]: { [lang: string]: string } } = {
  Temperature: {
    fr: 'Température',
    es: 'Temperatura',
    de: 'Temperatur',
    ua: 'Температура',
    ru: 'Температура',
    cz: 'Teplota',
    default: 'Temperature'
  },
  Humidity: {
    fr: 'Humidité',
    es: 'Humedad',
    de: 'Luftfeuchtigkeit',
    ua: 'Вологість',
    ru: 'Влажность',
    cz: 'Vlhkost',
    default: 'Humidity'
  },
  WindSpeed: {
    fr: 'Vitesse du vent',
    es: 'Velocidad del viento',
    de: 'Windgeschwindigkeit',
    ua: 'Швидкість вітру',
    ru: 'Скорость ветра',
    cz: 'Rychlost větru',
    default: 'Wind Speed'
  },
  Condition: {
    fr: 'Condition',
    es: 'Condición',
    de: 'Bedingung',
    ua: 'Стан',
    ru: 'Состояние',
    cz: 'Stav',
    default: 'Condition'
  },
  Country: {
    fr: 'Pays',
    es: 'País',
    de: 'Land',
    ua: 'Країна',
    ru: 'Страна',
    cz: 'Země',
    default: 'Country'
  }
};

const translateLabel = (label: string, lang: string) => {
  return translations[label]?.[lang] || translations[label]?.default || label;
};

const WeatherDisplay: React.FC<{ weather: Weather; lang: string }> = ({ weather, lang }) => {
  return (
    <div className="weather-display">
      <h1 className="weather-info">{weather.city}</h1>
      <p className="weather-info">{translateLabel('Temperature', lang)}: {weather.temperature}°C</p>
      <p className="weather-info">{translateLabel('Humidity', lang)}: {weather.humidity}%</p>
      <p className="weather-info">{translateLabel('WindSpeed', lang)}: {weather.windSpeed} m/s</p>
      <p className="weather-info">{translateLabel('Condition', lang)}: {weather.condition}</p>
      <p className="weather-info">{translateLabel('Country', lang)}: {getTranslatedCountryName(weather.country, lang)}</p>
    </div>
  );
};

export default WeatherDisplay;
