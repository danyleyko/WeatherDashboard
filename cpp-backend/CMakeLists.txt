cmake_minimum_required(VERSION 3.20)
project(myserver)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
find_package(Protobuf CONFIG REQUIRED)
find_package(gRPC CONFIG REQUIRED)
find_package(CURL REQUIRED)

add_library(protolib weather.proto)
target_link_libraries(protolib gRPC::grpc++)
target_include_directories(protolib PUBLIC ${CMAKE_CURRENT_BINARY_DIR})
get_target_property(grpc_cpp_plugin_location gRPC::grpc_cpp_plugin LOCATION)
protobuf_generate(TARGET protolib LANGUAGE cpp)

protobuf_generate(TARGET protolib LANGUAGE grpc
GENERATE_EXTENSIONS .grpc.pb.h .grpc.pb.cc
PLUGIN "protoc-gen-grpc=${grpc_cpp_plugin_location}")

add_executable(server server.cpp)
target_link_libraries(server protolib CURL::libcurl)

include_directories(${CMAKE_SOURCE_DIR}/external_libs)

add_library(nlohmann_json INTERFACE)
target_include_directories(nlohmann_json INTERFACE external_libs/nlohmann)

target_link_libraries(server
    ${CURL_LIBRARIES}
    nlohmann_json
    CURL::libcurl
)

# If you have another executable
add_executable(Weather_Dashboard server.cpp)

target_link_libraries(Weather_Dashboard
    ${CURL_LIBRARIES}
    nlohmann_json
    CURL::libcurl
    protolib
)
