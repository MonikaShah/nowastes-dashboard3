// This is the map component. It will render the map.

// React imports
import { useState, useEffect } from "react";

// Zustand imports
import { useStore } from "../store/store.js";

// React Leaflet imports
import { MapContainer, TileLayer, LayersControl, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const { BaseLayer } = LayersControl;

// Custom Components
import ZoomToBounds from "./ZoomToBounds";
import InfoControl from "./InfoControl";

// util imports
import {
  wardStyle,
  prabhagStyle,
  regionStyle,
  buildingStyle,
} from "../utils/geojsonStyles.js";
import { tileLayers } from "../utils/tileLayers.js";

// api imports
import fetchWasteDataV1 from "../utils/fetchWasteDataV1.js";
import fetchGeoDataV1 from "../utils/fetchGeoDataV1.js";
// import useFetchGeoDataV2 from "../utils/FetchGeoDataV2.js";

// some constants

// center of the map
const mapCentre = [19.095913, 72.880146];
const defaultZoom = 10.8;
const maxZoom = 18;
const minZoom = 10;
const zoomSnap = 0.1;
const zoomDelta = 1;
const mapStyle = { height: "100%", width: "100%" }; // dimension of the map

// layer names as shown in geoserver
const wardLayerName = "geonode:wards";
const prabhagLayerName = "geonode:prabhags";
const regionLayerName = "geonode:regions0";
const buildingLayerName = "geonode:buildings1";

// feature bounds
var featureBounds = null;

// MAP COMPONENT STARTS HERE
function Map() {
  // get required state variables from zustand store

  // to keep track of the current layer and function to update it
  const currentLayer = useStore((state) => state.currentLayer);
  const updateCurrentLayer = useStore((state) => state.updateCurrentLayer);

  // to keep track of the current layer number and functions to increment and decrement it
  const layerNumber = useStore((state) => state.layerNum);
  const incrementLayerNumber = useStore((state) => state.incrementLayerNum);
  const decrementLayerNumber = useStore((state) => state.decrementLayerNum);

  // geo data names and their update functions
  const selectedWardName = useStore((state) => state.selectedWardName);
  const selectedPrabhagName = useStore((state) => state.selectedPrabhagName);
  const selectedRegionName = useStore((state) => state.selectedRegionName);
  const selectedBuildingName = useStore((state) => state.selectedBuildingName);

  const updateSelectedWardName = useStore(
    (state) => state.updateSelectedWardName
  );
  const updateSelectedPrabhagName = useStore(
    (state) => state.updateSelectedPrabhagName
  );
  const updateSelectedRegionName = useStore(
    (state) => state.updateSelectedRegionName
  );
  const updateSelectedBuildingName = useStore(
    (state) => state.updateSelectedBuildingName
  );

  // to keep track of selected Feature and function to update it
  const selectedFeature = useStore((state) => state.selectedFeature);
  const updateSelectedFeature = useStore(
    (state) => state.updateSelectedFeature
  );

  // to keep track of selected Feature's name and function to update it
  const selectedFeatureName = useStore((state) => state.selectedFeatureName);
  const updateSelectedFeatureName = useStore(
    (state) => state.updateSelectedFeatureName
  );

  // map bounds and function to update it
  const mapBounds = useStore((state) => state.bounds);
  const updateMapBounds = useStore((state) => state.updateBounds);

  // loading state and function to update it
  const isLoading = useStore((state) => state.isLoading);
  const updateIsLoading = useStore((state) => state.updateIsLoading);

  // has drilled down and function to update it
  const hasDrilledDown = useStore((state) => state.hasDrilledDown);
  const updateHasDrilledDown = useStore((state) => state.updateHasDrilledDown);

  // to store geojson data and functions to update it
  const wardData = useStore((state) => state.wardData);
  const filteredPrabhagData = useStore((state) => state.filteredPrabhagData);
  const filteredRegionData = useStore((state) => state.filteredRegionData);
  const filteredBuildingData = useStore((state) => state.filteredBuildingData);

  const updateWardData = useStore((state) => state.updateWardData);
  const updateFilteredPrabhagData = useStore(
    (state) => state.updateFilteredPrabhagData
  );
  const updateFilteredRegionData = useStore(
    (state) => state.updateFilteredRegionData
  );
  const updateFilteredBuildingData = useStore(
    (state) => state.updateFilteredBuildingData
  );

  // LAYER HEIRARCHY
  // ward: 1
  // prabhag: 2
  // region: 3
  // building: 4

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////  HELPER FUNCTIONS  ////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // function to handle click on a feature
  function onFeatureClick(e) {
    // feature name
    var featureName;

    // selected feature
    var selectedFeature = e.target.feature;

    // Level 1: WARD
    if (layerNumber === 1) {
      featureName = e.target.feature.properties.name;
    }
    // Level 2: PRABHAG
    else if (layerNumber === 2) {
      featureName = e.target.feature.properties.name;
    }
    // Level 3: REGION
    else if (layerNumber === 3) {
      featureName = e.target.feature.properties.region;
    }
    // Level 4: BUILDING
    else if (layerNumber === 4) {
      featureName = e.target.feature.properties.name;
    } else {
      console.log("Invalid Feature Clicked");
    }

    // update selected feature and its name
    updateSelectedFeature(selectedFeature);
    updateSelectedFeatureName(featureName);
  }

  // function to fetch geo data for a layer
  const fetchGeoData = async (dataLayerName) => {
    const { data } = await fetchGeoDataV1(dataLayerName);
    return data;
  };

  // function to get info about a ward
  const getWardInfo = (e) => {
    const wardName = e.target.feature.properties.name;
    const wardID = e.target.feature.properties.id;

    return { wardName, wardID };
  };

  // function to get info about a prabhag
  const getPrabhagInfo = (e) => {
    const prabhagName = e.target.feature.properties.name;
    const prabhagID = e.target.feature.properties.id;
    const parentWardID = e.target.feature.properties.parent_id;

    return { prabhagName, prabhagID, parentWardID };
  };

  // function to get info about a region
  const getRegionInfo = (e) => {
    const regionName = e.target.feature.properties.region;
    const regionID = e.target.feature.properties.id;
    const parentPrabhagID = e.target.feature.properties.prabhag_no;
    const parentWardID = e.target.feature.properties.ward_no;
    const parentWardName = e.target.feature.properties.ward;

    return {
      regionName,
      regionID,
      parentPrabhagID,
      parentWardID,
      parentWardName,
    };
  };

  // function to get info about a building
  const getBuildingInfo = (e) => {
    const buildingName = e.target.feature.properties.name;
    const buildingID = e.target.feature.properties.fid;
    const parentRegionName = e.target.feature.properties.region;
    const parentRegionID = e.target.feature.properties.region_id;
    const parentPrabhagName = e.target.feature.properties.prabhag;
    const parentWardName = e.target.feature.properties.ward;

    return {
      buildingName,
      buildingID,
      parentRegionName,
      parentRegionID,
      parentPrabhagName,
      parentWardName,
    };
  };

  //==============================================================================================================
  //==============================================================================================================
  //
  // MAIN CODE - DRILL DOWN
  //
  //==============================================================================================================
  //==============================================================================================================

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////  INITIAL MAP LOAD  ////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // async function to fetch all data for a layer
  const fetchWardData = async () => {
    // set loading state to true
    updateIsLoading(true);

    // fetch geo data
    const geoData = await fetchGeoData(wardLayerName);
    console.log("WARD GEO DATA: ", geoData);

    // update ward data
    updateWardData(geoData);

    // set loading state to false
    updateIsLoading(false);
  };

  // fetch ward data on initial map load
  useEffect(() => {
    // fetch ward data
    fetchWardData();
  }, []);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////  WARD DRILL DOWN //////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // function to handle ward drill down
  // we go from ward to prabhag

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////  GEOJSON COMPONENTS ///////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // render map layers based on current layer state
  // Level 1: WARD
  const WardLayer = () => {
    return (
      <GeoJSON
        data={wardData}
        style={wardStyle}
        onEachFeature={(feature, layer) => {
          layer.on({
            click: onFeatureClick,
          });
        }}
      />
    );
  };

  return (
    <MapContainer
      center={mapCentre}
      zoom={defaultZoom}
      zoomSnap={zoomSnap}
      zoomDelta={zoomDelta}
      doubleClickZoom={false}
      minZoom={minZoom}
      maxZoom={maxZoom}
      style={mapStyle}
    >
      {/* Layer Control to toggle Tile Layers */}
      <LayersControl position="topright">
        {tileLayers.map((layer, index) => (
          <BaseLayer key={index} name={layer.name} checked={layer.checked}>
            <TileLayer url={layer.url} />
          </BaseLayer>
        ))}
      </LayersControl>

      {/* Add info control here */}
      <InfoControl position="topright" content={{selectedFeatureName, currentLayer}} />

      {/* ward geojson layer */}
      {currentLayer === "ward" && <WardLayer />}
    </MapContainer>
  );
}

export default Map;
