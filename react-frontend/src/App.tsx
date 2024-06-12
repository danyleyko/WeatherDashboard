import React, { useState } from 'react';
import axios from 'axios';
import WeatherDisplay from './WeatherDisplay';
import { Weather, WeatherData } from './types';
import './App.css';

const App: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      console.log(`Searching for city: ${city}`);
      const response = await axios.get<Weather>(`http://localhost:18080/weather?city=${city}`);
  
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      const axiosError = err as any; // Type assertion to any
  
      if (axiosError.response) {
        if (axiosError.response.status === 404) {
          setError(axiosError.response.data.message || 'City not found');
        } else {
          setError('An unexpected error occurred');
        }
      } else {
        setError('Network error connecting to server');
      }
      setWeatherData(null);
    }
  };
  

  return (
    <div className="App">
      
      <div className="logo-svg" ></div> 

      <h1>Real-Time Weather Dashboard by API</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />

      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}

      <div>{weatherData && <WeatherDisplay weather={weatherData} />}</div>

    </div>
  );
}

export default App;