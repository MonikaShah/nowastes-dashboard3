// this file contains code for styling the geojson data at different administrative levels

// zustand imports
import { useStore } from "../store/store.js";

// util imports
import getColor from "./getColor.js";

// ward style
export const wardStyle = (feature) => {
  // get the selected parameter from the store to determine the color scale
  const selectedParameter = useStore((state) => state.selectedParameter);

  // check if the selected parameter is present in the geojson data
  if (feature.properties && feature.properties[selectedParameter]) {
    return {
      fillColor: getColor(feature.properties[selectedParameter]),
      weight: 2,
      opacity: 1,
      color: "#000000",
      fillOpacity: 0.9,
    };
  } else {
    return {
      fillColor: "#ff9999",
      weight: 2,
      opacity: 1,
      color: "#000000",
      fillOpacity: 0.7,
    };
  }
};

// prabhag style
export const prabhagStyle = (feature) => {
  // get the selected parameter from the store to determine the color scale
  const selectedParameter = useStore((state) => state.selectedParameter);

  // check if the selected parameter is present in the geojson data
  if (feature.properties && feature.properties[selectedParameter]) {
    return {
      fillColor: getColor(feature.properties[selectedParameter]),
      weight: 2,
      opacity: 1,
      color: "#000000",
      fillOpacity: 0.9,
    };
  } else {
    return {
      fillColor: "#99ffcc",
      weight: 2,
      opacity: 1,
      color: "#000000",
      fillOpacity: 0.7,
    };
  }
};

// region style
export const regionStyle = (feature) => {
  // get the selected parameter from the store to determine the color scale
  const selectedParameter = useStore((state) => state.selectedParameter);

  // check if the selected parameter is present in the geojson data
  if (feature.properties && feature.properties[selectedParameter]) {
    return {
      fillColor: getColor(feature.properties[selectedParameter]),
      weight: 2,
      opacity: 1,
      color: "#000000",
      fillOpacity: 0.9,
    };
  } else {
    return {
      fillColor: "#ff99ff",
      weight: 2,
      opacity: 1,
      color: "#000000",
      fillOpacity: 0.7,
    };
  }
};

// building style
export const buildingStyle = (feature) => {
  // get the selected parameter from the store to determine the color scale
  const selectedParameter = useStore((state) => state.selectedParameter);

  // check if the selected parameter is present in the geojson data
  if (feature.properties && feature.properties[selectedParameter]) {
    return {
      fillColor: getColor(feature.properties[selectedParameter]),
      weight: 2,
      opacity: 1,
      color: "#000000",
      fillOpacity: 0.9,
    };
  } else {
    return {
      fillColor: "#9999ff",
      weight: 2,
      opacity: 1,
      color: "#000000",
      fillOpacity: 0.7,
    };
  }
};
