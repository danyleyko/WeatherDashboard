# How To Run

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

2. **Run Server**
   - Start the backend server:
     ```
     ./server
     ```
   - This command will launch the GRPC backend service.

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

## Contributing

Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE) © Kirill Danyleyko
