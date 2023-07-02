// This component is used to zoom to the bounds of a polygon. It is used in the Map component.

// React-Leaflet imports
import { useMap } from "react-leaflet";

// this component is used to zoom to the bounds of a polygon
function ZoomToBounds(polygonBounds) {
  // get the map object
  const map = useMap();

  // get the bounds of the polygon
  const lat1 = polygonBounds.bounds._southWest.lat;
  const lng1 = polygonBounds.bounds._southWest.lng;
  const lat2 = polygonBounds.bounds._northEast.lat;
  const lng2 = polygonBounds.bounds._northEast.lng;

  // create a new bounds array
  const newBounds = [
    [lat1, lng1],
    [lat2, lng2],
  ];

  // zoom to the bounds of the polygon - simply use fitBounds() or flyToBounds() as per your requirement
  // map.fitBounds(newBounds);
  map.flyToBounds(newBounds);
  return null;
}

export default ZoomToBounds;