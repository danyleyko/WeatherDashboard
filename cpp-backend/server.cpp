/**
 * @file server.cpp
 * @brief Implementation of a gRPC server for weather services.
 */

#include "server.hpp"

/**
 * @brief Runs the gRPC server.
 * 
 * This function initializes and runs the gRPC server on the specified address.
 * It sets up the server with the `WeatherServiceImpl` service implementation,
 * starts the server, and waits for it to shut down.
 */
void RunServer()
{
    std::string server_address("0.0.0.0:9090");
    WeatherServiceImpl service;

    ServerBuilder builder;
    builder.AddListeningPort(server_address, grpc::InsecureServerCredentials());
    builder.RegisterService(&service);
    std::unique_ptr<Server> server(builder.BuildAndStart());
    std::cout << "Server listening on " << server_address << std::endl;
    
    server->Wait();
}

/**
 * @brief Main function.
 * 
 * The main function serves as the entry point of the program. It calls the 
 * `RunServer` function to start the gRPC server.
 * 
 * @param argc The number of command-line arguments.
 * @param argv The array of command-line arguments.
 * @return int Returns 0 upon successful execution.
 */
int main(int argc, char **argv)
{
    RunServer();
    return 0;
}
