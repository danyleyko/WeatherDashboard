import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';

const container = document.getElementById('root'); // Get the root element

if (container) { // Ensure the container is not null
  const root = createRoot(container); // Create a root
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}
