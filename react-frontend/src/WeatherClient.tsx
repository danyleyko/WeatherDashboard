import React, { useState } from "react";
import "./WeatherClient.css";
import WeatherDisplay from "./ui/WeatherDisplay";
import { WeatherServiceClient } from "./proto/WeatherServiceClientPb";
import { WeatherRequest, WeatherResponse } from "./proto/weather_pb";

/**
 * WeatherClient component.
 * 
 * This component displays a real-time weather dashboard that allows users to search for weather
 * information of a city in various languages using a gRPC service.
 */
const WeatherClient: React.FC = () => {
  // State variables
  const [weatherData, setWeatherData] = useState<WeatherResponse.AsObject | null>(null);
  const [lang, setLang] = useState<string>("en"); // Default language is English
  const [city, setCity] = useState<string>("");   // State for user-entered city name
  const [error, setError] = useState<string>(""); // State for error messages

  // gRPC client setup
  const client = new WeatherServiceClient("http://localhost:8080");

  /**
   * Fetches weather data from the server.
   * 
   * @param city The city name for which weather data is requested.
   * @param lang The language code for the weather information (e.g., 'en' for English).
   */
  const fetchWeatherData = async (city: string, lang: string) => {
    console.log(`Searching for weather in "${city}" with language "${lang}"`);
    const request = new WeatherRequest();
    request.setCity(city);
    request.setLang(lang);

    try {
      // Headers for the request (optional example headers)
      const requestHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'keep-alive,user-agent,cache-control,content-type,content-transfer-encoding,authorization,grpc-timeout,x-user-agent',
      };
      
      // Call the gRPC service method to get weather data
      const response = await client.getWeather(request, requestHeaders);
      
      // Update state with received weather data
      setWeatherData(response.toObject());
      setError(""); // Clear any previous error messages

    } catch (error) {
      // Handle errors from the gRPC call
      const Error = error as any;
      setError(Error.message);
      setWeatherData(null); // Reset weather data on error
    }
  };

  /**
   * Handles the search button click event.
   * 
   * Initiates fetching weather data for the entered city and selected language.
   */
  const handleSearch = () => {
    if (city) {
      fetchWeatherData(city, lang);
    } else {
      setError("Please enter a city name."); // Show error if city name is empty
    }
  };

  return (
    <div className="Client">
      <div className="logo-svg"></div>

      <div>
        <h1>Real-time weather dashboard using API</h1>
      </div>

      {/* Language selector and city input */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <select
          className="language-select"
          value={lang}
          style={{ marginRight: 15 }}
          onChange={(e) => setLang(e.target.value)}
        >
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
          placeholder="Enter city name"
        />

        <button
          className="search-button"
          onClick={handleSearch}
          style={{ marginLeft: 10 }}
        >
          Search
        </button>
      </div>

      {/* Display error message if any */}
      {error && <h4 style={{ color: "#b94536" }}>{error}</h4>}

      {/* Display weather information if available */}
      <div>
        {weatherData && <WeatherDisplay weather={weatherData} lang={lang} />}
      </div>
    </div>
  );
};

export default WeatherClient;
