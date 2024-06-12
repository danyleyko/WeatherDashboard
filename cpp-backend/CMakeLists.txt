cmake_minimum_required(VERSION 3.10)
project(Weather_Dashboard)

set(CMAKE_CXX_STANDARD 14)

# Add the external library headers
include_directories(${CMAKE_SOURCE_DIR}/external_libs)

# Find and link required libraries
find_package(CURL REQUIRED)

# Add the nlohmann_json header-only library manually
add_library(nlohmann_json INTERFACE)
target_include_directories(nlohmann_json INTERFACE external_libs/nlohmann)

# Add the executable
add_executable(Weather_Dashboard main.cpp)

# Link libraries
target_link_libraries(Weather_Dashboard
    ${CURL_LIBRARIES}
    nlohmann_json
)
