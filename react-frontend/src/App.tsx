import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import WeatherDisplay from "./WeatherDisplay";
import { Weather } from "./types";
import "./App.css";

const App: React.FC = () => 
{
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  const [error, setError] = useState("");
  const [lang, setLang] = useState("en");

  const handleSearch = useCallback(async () => 
  {
    try 
    {
      console.log(`Searching for city: ${city}`);
      console.log(`Language request: ${lang}`);
      
      const response = await axios.get<Weather>(`http://localhost:18080/weather?city=${city}&lang=${lang}`);

      setWeatherData(response.data);
      setError("");
    } 
    catch (err) 
    {
      const axiosError = err as any;
      if (axiosError.response) 
      {
        if (axiosError.response.status === 404) 
        {
          setError(axiosError.response.data.message || "City not found");
        } 
        else 
        {
          setError("An unexpected error occurred");
        }
      } 
      else 
      {
        setError("Network error connecting to server");
      }
      setWeatherData(null);
    }
  }, [city, lang]);

  useEffect(() => 
  {
    if (city) {
      handleSearch();
    }
  }, [lang, city, handleSearch]);

  return (
    <div className="App">

      <div className="logo-svg"></div>

      <div>
          <h1> Real-time weather dashboard using API</h1>
      </div>
      
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <select
          className="language-select"
          value={lang}
          style={{ marginRight: 15 }}
          onChange={(e) => setLang(e.target.value)}>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
          <option value="ua">Ukrainian</option>
          <option value="ru">Russian</option>
          <option value="cz">Czech</option>
        </select>

        <input
          className="search-input"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"/>
        
        <button
          onClick={handleSearch}
          className="search-button"
          color="primary"
          style={{ marginLeft: 10 }}>
          Search
        </button>

      </div>
      
      {error && <h4 style={{ color: "#b94536" }}>{error}</h4>}
      
      <div>
        {weatherData && <WeatherDisplay weather={weatherData} lang={lang} />}
      </div>

    </div>
  );
};

export default App;
