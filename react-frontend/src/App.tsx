import React from 'react';
import WeatherClient from './pages/WeatherClient';

/**
 * App component.
 * 
 * This component serves as the entry point of the application. It renders the WeatherClient
 * component which displays a real-time weather dashboard.
 */
const App: React.FC = () => {
  return (
    <div className="App">
      <WeatherClient />
    </div>
  );
};

export default App;