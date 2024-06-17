# Real-Time Weather Information App

This application provides real-time weather information based on user-specified city and language preferences. Users can search for any city and select their preferred language to retrieve up-to-date weather details.

## Tech Stacks

- **Backend**: GRPC service implemented in C++
- **Frontend**: React with TypeScript
- **Proxy**: Envoy for gRPC-Web

## How To Run

### Backend

1. **Setup and Build**
   - Navigate to `./cpp-backend` and create a `build` directory:
     ```
     mkdir build
     cd build
     cmake ..
     make
     ```
   - This will compile `server.cpp` into an executable.

2. **Set OpenWeatherMap API Key**
   - Obtain an API key from [OpenWeatherMap](https://openweathermap.org/price), you can choose a free plan.
   - Export the API key as an environment variable (replace `<your_api_key>` with your actual API key):
     ```
     export OPENWEATHERMAP_API_KEY="<your_api_key>"
     ```

3. **Run Server**
   - Start the backend server:
     ```
     ./server
     ```
   - This command will launch the GRPC backend service. The server will use the `OPENWEATHERMAP_API_KEY` environment variable to authenticate requests to OpenWeatherMap.

### Proxy

1. **Install and Run Envoy**
   - Download and install Envoy from [Envoy's official site](https://www.envoyproxy.io/docs/envoy/latest/start/install).

2. **Configure and Start**
   - Navigate to `./react-fronted` and start Envoy with the provided configuration file (`envoy.yaml`):
     ```
     envoy -c envoy.yaml
     ```
   - This command will start the Envoy proxy configured to bridge between the frontend and backend via gRPC-Web.

### Frontend

1. **Install Dependencies**
   - Ensure you have Node.js and npm installed. If not, download Node.js from [npm's official site](https://www.npmjs.com/package/npm).

2. **Install Packages**
   - Navigate to `./react-fronted` and install required packages:
     ```
     npm install
     ```
   - This command installs all necessary dependencies specified in `package.json`.

3. **Run Frontend**
   - Start the frontend server:
     ```
     npm start
     ```
   - This command compiles TypeScript and launches the React development server.

### Optional

- **Generate Proto Files**
  - To regenerate proto files if needed:
    ```
    npm run build
    ```
  - This command rebuilds TypeScript files from the proto definitions.

- **Generate Docs**
  - To regenerate documantation created by Doxygen if needed:
    ```
    make docs
    ```
  - To delete documantation files by Doxygen if needed:
    ```
    make clean
    ```
## Contributing

Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

### **© Kirill Danyleyko**
