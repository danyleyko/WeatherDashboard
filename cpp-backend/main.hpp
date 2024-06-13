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