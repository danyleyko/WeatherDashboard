#!/bin/bash

# Define the directory for external libraries
LIB_DIR="../src/external_libs"

# Create the directory if it doesn't exist
mkdir -p $LIB_DIR

# Download cpp-httplib
HTTPLIB_DIR="$LIB_DIR/cpp-httplib"
mkdir -p $HTTPLIB_DIR
wget -O $HTTPLIB_DIR/httplib.h https://raw.githubusercontent.com/yhirose/cpp-httplib/master/httplib.h

# Download nlohmann/json
JSON_DIR="$LIB_DIR/nlohmann"
mkdir -p $JSON_DIR
wget -O $JSON_DIR/json.hpp https://raw.githubusercontent.com/nlohmann/json/develop/single_include/nlohmann/json.hpp

echo "Libraries downloaded successfully."
