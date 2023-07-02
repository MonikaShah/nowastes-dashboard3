// Custom React Hook to fetch geo data from the GeoServer API
// This Custom React Hook uses useSWR to fetch the data asynchronously

// react imports
import useSWR from "swr";

// utils imports
import buildGeoURL from "./buildGeoURL.js";

// This is a custom hook that fetches the geojson data from the API asynchrnously
function useFetchGeoDataV2(typename, cql = null) {

    // Build the URL
    const url = buildGeoURL(typename, cql);

    // Fetch the data using SWR
    const fetcher = (...args) => fetch(...args).then(res => {
        if (!res.ok) {
            throw new Error('GeoJSON response not ok')
        }
        return res.json()
    })

    // useSWR hook is used to fetch the data
    // revalidateOnFocus and revalidateOnReconnect are set to false to prevent revalidation of data on focus and reconnect
    const { data, error } = useSWR(url, fetcher, {revalidateOnFocus: false, revalidateOnReconnect: false});

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    };
}

export default useFetchGeoDataV2;