/**
 * @file server.hpp
 * @brief Declaration of the weather service gRPC server.
 */

#ifndef SERVER_HPP
#define SERVER_HPP

#include <curl/curl.h>
#include "external-libs/nlohmann/json.hpp"
#include <memory>
#include <iostream>
#include <string>
#include <vector>

#include <grpcpp/grpcpp.h>
#include "weather.grpc.pb.h"
#include "weather.pb.h"

using grpc::Server;
using grpc::ServerBuilder;
using grpc::ServerContext;
using grpc::Status;
using weather::WeatherRequest;
using weather::WeatherResponse;
using weather::WeatherService;

/**
 * @brief Implementation of the WeatherService gRPC service.
 * 
 * This class implements the WeatherService defined in the gRPC proto file.
 * It provides functionality to handle weather requests and fetch weather data.
 */
class WeatherServiceImpl final : public WeatherService::Service
{
public:
    /**
     * @brief Handles GetWeather requests.
     * 
     * This function processes GetWeather requests by fetching weather data for the requested city
     * and setting the response with the retrieved weather information.
     * 
     * @param context The context for the server-side RPC.
     * @param request The weather request containing the city and language.
     * @param response The weather response to be populated with the weather data.
     * @return Status The status of the RPC (OK or error).
     */
    Status GetWeather(ServerContext *context, const WeatherRequest *request, WeatherResponse *response) override
    {
        std::cout << "Start GetWeather processing for city: " << request->city() << std::endl;

        std::string city = request->city();
        std::string lang = request->lang();

        std::string weather_data = fetch_weather_data(city, lang);

        if (weather_data.empty())
        {
            std::cerr << "Error fetching weather data for city: " << request->city() << std::endl;
            return Status(grpc::StatusCode::INTERNAL, "Error fetching weather data");
        }

        nlohmann::json obj;
        try
        {
            obj = nlohmann::json::parse(weather_data);
        }
        catch (nlohmann::json::parse_error &e)
        {
            return Status(grpc::StatusCode::INVALID_ARGUMENT, "Invalid weather data format");
        }

        if (obj["cod"] == "404")
        {
            return Status(grpc::StatusCode::NOT_FOUND, "City not found");
        }

        response->set_city(obj["name"]);
        response->set_temperature(obj["main"]["temp"]);
        response->set_humidity(obj["main"]["humidity"]);
        response->set_wind_speed(obj["wind"]["speed"]);
        response->set_condition(obj["weather"][0]["description"]);
        response->set_country(obj["sys"]["country"]);
        response->set_lang(lang);

        return Status::OK;
    }

private:
    /**
     * @brief Fetches weather data from an external API.
     * 
     * This function makes an HTTP request to the OpenWeatherMap API to fetch weather data
     * for the specified city and language.
     * 
     * @param city The name of the city for which to fetch weather data.
     * @param lang The language code for the weather data.
     * @return std::string The raw JSON weather data as a string.
     */
    std::string fetch_weather_data(const std::string &city, const std::string &lang)
    {
        const std::string api_key = std::getenv("OPENWEATHERMAP_API_KEY");

        if (api_key.empty())
        {
            std::cerr << "API key not found in environment variables." << std::endl;
            return "";
        }

        const std::string api_url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + api_key + "&lang=" + lang;

        CURL *curl = curl_easy_init();
        if (!curl)
        {
            std::cerr << "Failed to initialize CURL" << std::endl;
            return "";
        }

        std::string readBuffer;
        curl_easy_setopt(curl, CURLOPT_URL, api_url.c_str());
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &readBuffer);

        CURLcode res = curl_easy_perform(curl);
        if (res != CURLE_OK)
        {
            std::cerr << "CURL error: " << curl_easy_strerror(res) << std::endl;
            curl_easy_cleanup(curl);
            return "";
        }

        curl_easy_cleanup(curl);
        return readBuffer;
    }

    /**
     * @brief Custom deleter for std::unique_ptr<CURL>.
     * 
     * This struct provides a custom deleter for std::unique_ptr to automatically clean up a CURL handle.
     */
    struct CURLDeleter
    {
        /**
         * @brief Operator for cleaning up a CURL handle.
         * 
         * @param curl Pointer to the CURL handle to be cleaned up.
         */
        void operator()(CURL *curl)
        {
            curl_easy_cleanup(curl);
        }
    };

    /**
     * @brief Callback function for writing received data into a string buffer.
     * 
     * This function is used as a callback for libcurl to handle received data and append it to a string buffer.
     * 
     * @param buffer Pointer to the received data buffer.
     * @param size Size of each data element received.
     * @param nmemb Number of data elements received.
     * @param userp Pointer to the user-provided string buffer where data is appended.
     * @return size_t The total number of bytes written to `recv_buffer`.
     */
    static size_t write_callback(char *buffer, size_t size, size_t nmemb, void *userp)
    {
        std::string *recv_buffer = static_cast<std::string *>(userp);
        size_t received = size * nmemb;
        recv_buffer->append(buffer, received);
        return received;
    }
};

#endif // SERVER_HPP
