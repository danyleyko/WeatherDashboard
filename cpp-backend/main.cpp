#include "external_libs/cpp-httplib/httplib.h"
#include "external_libs/nlohmann/json.hpp"
#include <string>
#include <iostream>
#include <vector>
#include <curl/curl.h>
#include <memory>
#include "main.hpp"

/**
 * @brief Callback function for writing received data into a string buffer.
 * 
 * This function is used as a callback for libcurl to handle received data and append it to a string buffer.
 * 
 * @param buffer Pointer to the received data buffer.
 * @param size Size of each data element received.
 * @param nmemb Number of data elements received.
 * @param userp Pointer to the user-provided string buffer where data is appended.
 * @return Returns the total number of bytes written to `recv_buffer`.
 */
static size_t write_callback(char *buffer, size_t size, size_t nmemb, void *userp)
{
    std::string *recv_buffer = static_cast<std::string *>(userp);
    size_t received = size * nmemb;
    recv_buffer->append(buffer, received);
    return received;
}

/**
 * @brief Utility function to fetch weather data from OpenWeatherMap API.
 * 
 * This function makes a HTTP GET request to the OpenWeatherMap API to fetch weather data for a given city.
 * 
 * @param city The name of the city for which weather data is requested.
 * @return A string containing the JSON response from the API.
 */
std::string fetch_weather_data(const std::string &city, const std::string &lang)
{
    const std::string api_key = std::getenv("OPENWEATHERMAP_API_KEY");

    if (api_key.empty()) {
        std::cerr << "API key not found in environment variables." << std::endl;
        return "";
    }

    const std::string api_url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + api_key + "&lang=" + lang;

    std::cout << "Fetching weather data for city: " << city << std::endl;
    std::cout << "Language request: " << lang << std::endl;

    std::unique_ptr<CURL, CURLDeleter> curl(curl_easy_init());
    CURLcode res;
    std::string readBuffer;

    curl_global_init(CURL_GLOBAL_DEFAULT);

    if (curl)
    {
        curl_easy_setopt(curl.get(), CURLOPT_URL, api_url.c_str());
        curl_easy_setopt(curl.get(), CURLOPT_WRITEFUNCTION, write_callback);
        curl_easy_setopt(curl.get(), CURLOPT_WRITEDATA, &readBuffer);

        res = curl_easy_perform(curl.get());

        if (res != CURLE_OK)
        {
            std::cerr << "CURL error: " << curl_easy_strerror(res) << std::endl;
            curl_global_cleanup();
            return "";
        }
    }
    else
    {
        std::cerr << "Failed to initialize CURL" << std::endl;
        curl_global_cleanup();
        return "";
    }

    curl_global_cleanup();

    return readBuffer;
}

/**
 * @brief Main function.
 * 
 * This function initializes an HTTP server using httplib to provide weather data based on user requests.
 * 
 * @return 0 on successful execution.
 */
int main()
{
    httplib::Server svr;

    svr.Options("/weather", [](const httplib::Request &, httplib::Response &res)
    {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type");
        res.status = 204; 
    });

    svr.Get("/weather", [](const httplib::Request &req, httplib::Response &res)
    {
        // Set CORS headers for all responses
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.set_header("Content-Type", "application/json");

        if (!req.has_param("city")) 
        {
            res.status = 400;
            res.set_content("City parameter is required", "text/plain");
            return;
        }

        std::string city = req.get_param_value("city");
        std::string lang = req.get_param_value("lang");

        std::string weather_data = fetch_weather_data(city, lang);
        if (weather_data.empty()) 
        {
            res.status = 500;
            res.set_content("Error fetching weather data", "text/plain");
            return;
        }

        // .json from API
        nlohmann::json obj;
        try 
        {
            obj = nlohmann::json::parse(weather_data);
        } 
        catch (nlohmann::json::parse_error& e) 
        {
            res.status = 400;
            res.set_content("Invalid weather data format", "text/plain");
            return;
        }

        if (obj["cod"] == "404") {
            res.status = 404;
            res.set_content("City not found", "text/plain");
            return;
        }

        // result .json for prettier data saving 
        nlohmann::json result;
        result["city"] = obj["name"];
        result["temperature"] = obj["main"]["temp"];
        result["humidity"] = obj["main"]["humidity"];
        result["windSpeed"] = obj["wind"]["speed"];
        result["condition"] = obj["weather"][0]["description"];
        result["country"] = obj["sys"]["country"];

        res.set_content(result.dump(), "application/json"); 
    });

    std::cout << "Server is running on port 18080" << std::endl;
    svr.listen("0.0.0.0", 18080);

    return 0;
}
