// function to build the geoURL for the geoserver API

function buildGeoURL(typeName, cql = null) {
  // URL of the geoserver API
  const baseURL = "https://geonode.communitygis.in/geoserver/ows";

  // Default parameters for the geoserver API
  const defaultParameters = {
    service: "WFS",
    version: "1.0.0",
    request: "GetFeature",
    typeName: typeName,
    outputFormat: "json",
    srs: "EPSG:4326",
    srsName: "EPSG:4326",
    access_token: "9mx9mFkEU9ep1RqPPqUkfIxezLIXjB",
  };

  // create new parameters object with default parameters and the typeName
  const parameters = { ...defaultParameters, typeName };

  // if cql is not null, add it to the parameters object
  if (cql !== null) {
    parameters.cql_filter = cql;
  }

  // create the query string from the new parameters object
  const queryString = Object.entries(parameters)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  // construct the dynamic url by appending the query string to the base url
  var dynamicurl = `${baseURL}?${queryString}`;

  // return the dynamic url
  return dynamicurl;
}

export default buildGeoURL;
