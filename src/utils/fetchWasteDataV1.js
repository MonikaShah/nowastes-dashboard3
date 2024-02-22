// function to fetch waste data from the waste data API

// utils imports
import buildWasteURL from "./buildWasteURL";

// This function fetches the waste data from the API asynchronously
async function fetchWasteDataV1(queryParams, fallbackQueryParams = null) {
  let currentURL = window.location.href.split('/')
       
  // const baseURL = "http://127.0.0.1:5000/api";
  const basrURL = "https://nowaste-api-v1.onrender.com/";

  // set default parameters for the waste data API
  const defaultParameters = {
    admin_level: null,
    sampling_period: null,
    from_date: null,
    to_date: null,
  };

  // merge the default parameters with the query parameters
  const mergedQueryParams = { ...defaultParameters, ...queryParams };

  // Build the URL
  const url = buildWasteURL(baseURL, mergedQueryParams);

  // try to fetch the data with merged query parameters, if there is an error, try to fetch the data with fallback query parameters
  try {
    const res = await fetch(url);

    // check if the response is ok, if not throw an error, else return the data
    if (!res.ok) {
      // if response is 404 and fallback query parameters are provided, retry with fallback query parameters
      if (res.status === 404 && fallbackQueryParams) {
        // warn the user that the data is not fetched
        console.warn("Error 404: Retrying with fallback query parameters");

        // merge the default parameters with the fallback query parameters
        const fallbackMergedParams = {
          ...defaultParameters,
          ...fallbackQueryParams,
        };

        // Build the URL
        const fallbackURL = buildWasteURL(baseURL, fallbackMergedParams);

        // fetch the data with fallback query parameters
        const fallbackResponse = await fetch(fallbackURL);

        // check if the response is ok, if not throw an error, else return the data
        if (!fallbackResponse.ok) {
          throw new Error("HTTP error " + fallbackResponse.status);
        }

        // check content type of response
        const contentType = fallbackResponse.headers.get("content-type");

        // // if content type is not json, throw an error
        // if (!contentType || !contentType.includes("application/json")) {
        //   throw new TypeError("Content type is not json");
        // }

        const data = await fallbackResponse.json();
        return data;
      }
    }

    // check content type of response
    const contentType = res.headers.get("content-type");

    // if content type is not json, throw an error
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Content type is not json");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error caught while fetching waste data");
    throw err;
  }
}

export default fetchWasteDataV1;
