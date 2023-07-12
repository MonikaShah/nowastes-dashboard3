// This is the map component. It will render the map.

// React imports
import { useEffect } from "react";

// Zustand imports
import { useStore } from "../store/store.js";

// React Leaflet imports
import { MapContainer, TileLayer, LayersControl, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const { BaseLayer } = LayersControl;
import L from "leaflet";

// Custom Components
import ZoomToBounds from "./ZoomToBounds";
import InfoControl from "./InfoControl";
import DrillUpButton from "./DrillUpButton.jsx";
import Sidebar from "./Sidebar.jsx";

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
import ResetZoom from "./ResetZoom.jsx";
// import useFetchGeoDataV2 from "../utils/FetchGeoDataV2.js";

// some map options and constants
// center of the map
const mapCentre = [19.095913, 72.880146];
const defaultZoom = 10.8;
const maxZoom = 18;
const minZoom = 10;
const zoomSnap = 0.1;
const zoomDelta = 1;
const mapStyle = { height: "100%", width: "100%" }; // dimension of the map
const touchZoom = false;
const dragging = true;

// layer names as shown in geoserver
const wardLayerName = "geonode:wards_v4";
const prabhagLayerName = "geonode:prabhags_2023_v3";
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
  // const selectedBuildingName = useStore((state) => state.selectedBuildingName);

  const updateSelectedWardName = useStore(
    (state) => state.updateSelectedWardName
  );
  const updateSelectedPrabhagName = useStore(
    (state) => state.updateSelectedPrabhagName
  );
  const updateSelectedRegionName = useStore(
    (state) => state.updateSelectedRegionName
  );
  // const updateSelectedBuildingName = useStore(
  //   (state) => state.updateSelectedBuildingName
  // );

  // geo data variables to hold info about actual geo data during drill down
  // ward that has been drilled down into
  const drilledDownWard = useStore((state) => state.drilledDownWard);
  const updateDrilledDownWard = useStore(
    (state) => state.updateDrilledDownWard
  );

  // prabhag that has been drilled down into
  const drilledDownPrabhag = useStore((state) => state.drilledDownPrabhag);
  const updateDrilledDownPrabhag = useStore(
    (state) => state.updateDrilledDownPrabhag
  );

  // region that has been drilled down into
  const drilledDownRegion = useStore((state) => state.drilledDownRegion);
  const updateDrilledDownRegion = useStore(
    (state) => state.updateDrilledDownRegion
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

  // to store bounds for each layer and functions to update it
  const wardBounds = useStore((state) => state.wardBounds);
  const prabhagBounds = useStore((state) => state.prabhagBounds);
  const regionBounds = useStore((state) => state.regionBounds);
  // const buildingBounds = useStore((state) => state.buildingBounds);

  const updateWardBounds = useStore((state) => state.updateWardBounds);
  const updatePrabhagBounds = useStore((state) => state.updatePrabhagBounds);
  const updateRegionBounds = useStore((state) => state.updateRegionBounds);
  // const updateBuildingBounds = useStore((state) => state.updateBuildingBounds);

  // start date and end date and functions to update them
  const startDate = useStore((state) => state.startDate);
  const endDate = useStore((state) => state.endDate);
  const updateStartDate = useStore((state) => state.updateStartDate);
  const updateEndDate = useStore((state) => state.updateEndDate);

  // sampling period and function to update it
  const samplingPeriod = useStore((state) => state.samplingPeriod);
  const updateSamplingPeriod = useStore((state) => state.updateSamplingPeriod);

  // selected parameter and function to update it
  const selectedParameter = useStore((state) => state.selectedParameter);

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
  const fetchGeoData = async (dataLayerName, cql = null) => {
    const { data } = await fetchGeoDataV1(dataLayerName, cql);
    return data;
  };

  // function to get info about a ward
  const getWardInfo = (e) => {
    const wardName = e.target.feature.properties.name;
    const wardID = e.target.feature.properties.id;
    const wardBounds = e.target._bounds;

    return { wardName, wardID, wardBounds };
  };

  // function to get info about a prabhag
  const getPrabhagInfo = (e) => {
    const prabhagName = e.target.feature.properties.name;
    const prabhagID = e.target.feature.properties.id;
    const parentWardID = e.target.feature.properties.ward_id;
    const prabhagBounds = e.target._bounds;

    return { prabhagName, prabhagID, parentWardID, prabhagBounds };
  };

  // function to get info about a region
  const getRegionInfo = (e) => {
    const regionName = e.target.feature.properties.region;
    const regionID = e.target.feature.properties.id;
    const parentPrabhagID = e.target.feature.properties.prabhag_no;
    const parentWardID = e.target.feature.properties.ward_no;
    const parentWardName = e.target.feature.properties.ward;
    const regionBounds = e.target._bounds;

    return {
      regionName,
      regionID,
      parentPrabhagID,
      parentWardID,
      parentWardName,
      regionBounds,
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
    const buildingBounds = e.target._bounds;

    return {
      buildingName,
      buildingID,
      parentRegionName,
      parentRegionID,
      parentPrabhagName,
      parentWardName,
      buildingBounds,
    };
  };

  // bounds for each layer
  // these are used to reset map view as well as in the drill up function
  const initialMapBounds = L.geoJSON(wardData).getBounds();
  const selectedWardBounds = L.geoJSON(filteredPrabhagData).getBounds();
  const selectedPrabhagBounds = L.geoJSON(filteredRegionData).getBounds();
  const selectedRegionBounds = L.geoJSON(filteredBuildingData).getBounds();

  // function to reset map view
  const resetMapZoom = () => {
    // reset map bounds based on layer
    if (layerNumber === 1) {
      updateMapBounds(initialMapBounds);
    } else if (layerNumber === 2) {
      updateMapBounds(selectedWardBounds);
    } else if (layerNumber === 3) {
      updateMapBounds(selectedPrabhagBounds);
    } else if (layerNumber === 4) {
      updateMapBounds(selectedRegionBounds);
    }
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

  // async function to fetch all data for ward layer
  const fetchWardData = async () => {
    // set loading state to true
    updateIsLoading(true);

    // Function to build Ward Waste data Query Params
    const buildWardWasteDataQueryParams = (
      startDate,
      endDate,
      samplingPeriod
    ) => {
      // build query params
      let params = {
        admin_level: "ward",
        from_date: startDate,
        to_date: endDate,
        sampling_period: samplingPeriod,
      };

      return params;
    };

    // build query params
    let queryParams = buildWardWasteDataQueryParams(
      startDate,
      endDate,
      samplingPeriod
    );
    // console.log("Query Params: ", queryParams);

    // fetch geo data
    const geoData = await fetchGeoData(wardLayerName);
    // console.log("Ward Geo Data: ", geoData);

    // fetch ward waste data
    const wardWasteData = await fetchWasteDataV1(queryParams);
    // console.log("Ward Waste Data: ", wardWasteData);

    // Merge ward geo data and ward waste data
    const mergeGeoAndWasteData = (geoData, wardWasteData, featureName) => {
      // check if ward geo data and ward waste data are present
      if (!wardWasteData || !geoData) {
        console.error("Error: Ward Geo Data or Ward Waste Data is missing");
        return;
      }

      // loop over ward geo data
      geoData.features.forEach((feature) => {
        // get the primary id of the geo data
        const featureNameLower = feature.properties[featureName]
          .toString()
          .toLowerCase();

        // loop over ward waste data
        const wasteDataForFeature = wardWasteData.filter(
          (wasteData) => wasteData.primary_id === featureNameLower
        );

        // check if ward waste data is present for the feature
        if (wasteDataForFeature.length > 0) {
          // add ward waste data to the geo data
          feature.properties = {
            ...feature.properties,
            ...wasteDataForFeature[0],
          };
        }
      });

      return geoData;
    };

    // merge ward geo data and ward waste data
    const mergedGeoData = mergeGeoAndWasteData(geoData, wardWasteData, "id");
    // console.log("Merged Ward Geo Data: ", mergedGeoData);

    // update ward data
    updateWardData(mergedGeoData);

    // set loading state to false
    updateIsLoading(false);
  };

  // fetch ward data on initial map load
  useEffect(() => {
    // fetch ward data
    fetchWardData();
  }, [startDate, endDate, samplingPeriod, selectedParameter]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////  WARD DRILL DOWN //////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // function to handle ward drill down
  // we go from ward to prabhag
  const handleWardDrillDown = async (e) => {
    // set loading state to true
    updateIsLoading(true);

    // get ward info
    const { wardName, wardID, wardBounds } = getWardInfo(e);

    // create cql filter
    const cql = `ward_id = ${wardID}`;

    // Function to build Prabhag Waste data Query Params
    const buildPrabhagWasteDataQueryParams = (
      startDate,
      endDate,
      samplingPeriod
    ) => {
      // build query params
      let params = {
        admin_level: "prabhag",
        from_date: startDate,
        to_date: endDate,
        sampling_period: samplingPeriod,
        parent_id: wardID,
      };

      return params;
    };

    // build query params
    let queryParams = buildPrabhagWasteDataQueryParams(
      startDate,
      endDate,
      samplingPeriod
    );

    // fetch geo data
    const geoData = await fetchGeoData(prabhagLayerName, cql);

    // fetch prabhag waste data
    const prabhagWasteData = await fetchWasteDataV1(queryParams);

    // Merge prabhag geo data and prabhag waste data
    const mergeGeoAndWasteData = (geoData, prabhagWasteData, featureName) => {
      // check if prabhag geo data and prabhag waste data are present
      if (!prabhagWasteData || !geoData) {
        console.error(
          "Error: Prabhag Geo Data or Prabhag Waste Data is missing"
        );
        return;
      }

      // loop over prabhag geo data
      geoData.features.forEach((feature) => {
        // get the primary id of the geo data
        const featureNameLower = feature.properties[featureName]
          .toString()
          .toLowerCase();

        // loop over prabhag waste data
        const wasteDataForFeature = prabhagWasteData.filter(
          (wasteData) => wasteData.primary_id === featureNameLower
        );

        // check if prabhag waste data is present for the feature
        if (wasteDataForFeature.length > 0) {
          // add prabhag waste data to the geo data
          feature.properties = {
            ...feature.properties,
            ...wasteDataForFeature[0],
          };
        }
      });

      return geoData;
    };

    // merge prabhag geo data and prabhag waste data
    const mergedGeoData = mergeGeoAndWasteData(geoData, prabhagWasteData, "id");
    // console.log("Merged Prabhag Geo Data: ", mergedGeoData);

    // condition to check if geo data contains any features
    if (mergedGeoData.features.length > 0) {
      // update hasDrilledDown state
      updateHasDrilledDown(true);

      // update filtered prabhag data
      updateFilteredPrabhagData(mergedGeoData);

      // update layer number
      incrementLayerNumber(layerNumber);

      // update selected ward name because this is the ward that we are drilling down from
      updateSelectedWardName(wardName);

      // update map bounds
      updateMapBounds(wardBounds);

      // update ward bounds state variable
      updateWardBounds(wardBounds);

      // update the ward that we have drilled down into
      updateDrilledDownWard(selectedFeature);

      // update current layer
      updateCurrentLayer("prabhag");
    } else {
      alert("No Prabhags Found for this Ward");
      updateSelectedWardName(null);
      updateHasDrilledDown(false);
    }

    // set loading state to false
    updateIsLoading(false);
  };


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////  PRABHAG DRILL DOWN ///////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // function to handle prabhag drill down
  // we go from prabhag to region
  const handlePrabhagDrillDown = async (e) => {
    // set loading state to true
    updateIsLoading(true);

    // get prabhag info
    const { prabhagName, prabhagID, prabhagBounds } = getPrabhagInfo(e);

    // create cql filter
    const cql = `prabhag_no = ${prabhagID}`;

    // Function to build Region Waste data Query Params
    const buildRegionWasteDataQueryParams = (
      startDate,
      endDate,
      samplingPeriod
    ) => {
      // build query params
      let params = {
        admin_level: "region",
        from_date: startDate,
        to_date: endDate,
        sampling_period: samplingPeriod,
        parent_id: prabhagID,
      };

      return params;
    };

    // build query params
    let queryParams = buildRegionWasteDataQueryParams(
      startDate,
      endDate,
      samplingPeriod
    );

    // fetch geo data
    const geoData = await fetchGeoData(regionLayerName, cql);
    // console.log("Region Geo Data: ", geoData);

    // fetch region waste data
    const regionWasteData = await fetchWasteDataV1(queryParams);

    // Merge region geo data and region waste data
    const mergeGeoAndWasteData = (geoData, regionWasteData, featureName) => {
      // check if region geo data and region waste data are present
      if (!regionWasteData || !geoData) {
        console.error("Error: Region Geo Data or Region Waste Data is missing");
        return;
      }

      // loop over region geo data
      geoData.features.forEach((feature) => {
        // get the primary id of the geo data
        const featureNameLower = feature.properties[featureName]
          .toString()
          .toLowerCase();

        // loop over region waste data
        const wasteDataForFeature = regionWasteData.filter(
          (wasteData) => wasteData.primary_id === featureNameLower
        );

        // check if region waste data is present for the feature
        if (wasteDataForFeature.length > 0) {
          // add region waste data to the geo data
          feature.properties = {
            ...feature.properties,
            ...wasteDataForFeature[0],
          };
        }
      });

      return geoData;
    };

    // merge region geo data and region waste data
    const mergedGeoData = mergeGeoAndWasteData(geoData, regionWasteData, "id");
    // console.log("Merged Region Geo Data: ", mergedGeoData);

    // condition to check if geo data contains any features
    if (mergedGeoData.features.length > 0) {
      // update hasDrilledDown state
      updateHasDrilledDown(true);

      // update filtered region data
      updateFilteredRegionData(mergedGeoData);

      // update layer number
      incrementLayerNumber(layerNumber);

      // update selected prabhag name because this is the prabhag that we are drilling down from
      updateSelectedPrabhagName(prabhagName);

      // update map bounds
      updateMapBounds(prabhagBounds);

      // update prabhag bounds state variable
      updatePrabhagBounds(prabhagBounds);

      // update current layer
      updateCurrentLayer("region");
    } else {
      alert("No Regions Found for this Prabhag");
      updateSelectedPrabhagName(null);
      // updateHasDrilledDown(false);
    }

    // set loading state to false
    updateIsLoading(false);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////  REGION DRILL DOWN ////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // function to handle region drill down
  // we go from region to building
  const handleRegionDrillDown = async (e) => {
    // set loading state to true
    updateIsLoading(true);

    // get region info
    const { regionName, regionID, regionBounds } = getRegionInfo(e);

    // create cql filter
    const cql = `region_id = ${regionID}`;

    // Function to build Building Waste data Query Params
    const buildBuildingWasteDataQueryParams = (
      startDate,
      endDate,
      samplingPeriod
    ) => {
      // build query params
      let params = {
        admin_level: "building",
        from_date: startDate,
        to_date: endDate,
        sampling_period: samplingPeriod,
        parent_id: regionID,
      };

      return params;
    };

    // build query params
    let queryParams = buildBuildingWasteDataQueryParams(
      startDate,
      endDate,
      samplingPeriod
    );

    // fetch geo data
    const geoData = await fetchGeoData(buildingLayerName, cql);

    // fetch building waste data
    const buildingWasteData = await fetchWasteDataV1(queryParams);

    // Merge building geo data and building waste data
    const mergeGeoAndWasteData = (geoData, buildingWasteData, featureName) => {
      // check if building geo data and building waste data are present
      if (!buildingWasteData || !geoData) {
        console.error(
          "Error: Building Geo Data or Building Waste Data is missing"
        );
        return;
      }

      // loop over building geo data
      geoData.features.forEach((feature) => {
        // get the primary id of the geo data
        const featureNameLower = feature.properties[featureName]
          .toString()
          .toLowerCase();

        // loop over building waste data
        const wasteDataForFeature = buildingWasteData.filter(
          (wasteData) => wasteData.primary_id === featureNameLower
        );

        // check if building waste data is present for the feature
        if (wasteDataForFeature.length > 0) {
          // add building waste data to the geo data
          feature.properties = {
            ...feature.properties,
            ...wasteDataForFeature[0],
          };
        }
      });

      return geoData;
    };

    // merge building geo data and building waste data
    const mergedGeoData = mergeGeoAndWasteData(
      geoData,
      buildingWasteData,
      "fid"
    );
    // console.log("Merged Building Geo Data: ", mergedGeoData);

    // condition to check if geo data contains any features
    if (mergedGeoData.features.length > 0) {
      // update hasDrilledDown state
      updateHasDrilledDown(true);

      // update filtered building data
      updateFilteredBuildingData(mergedGeoData);

      // update layer number
      incrementLayerNumber(layerNumber);

      // update selected region name because this is the region that we are drilling down from
      updateSelectedRegionName(regionName);

      // update map bounds
      updateMapBounds(regionBounds);

      // update region bounds state variable
      updateRegionBounds(regionBounds);

      // update current layer
      updateCurrentLayer("building");
    } else {
      alert("No Buildings Found for this Region");
      updateSelectedRegionName(null);
      // updateHasDrilledDown(false);
    }

    // set loading state to false
    updateIsLoading(false);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////  BUIDLING DRILL DOWN //////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // function to handle building drill down
  // no drill down is possible from building
  const handleBuildingDrillDown = async (e) => {
    // since we are at the last layer, we will not drill down any further
    // we will just show the building info
    alert("No Further Drill Down Possible!");
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////  DRILL UP FUNCTION ////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // function to handle drill up
  const handleDrillUp = () => {
    // based on current layer, we will drill up to the previous layer
    // building -> region
    // layer 4 -> layer 3
    if (currentLayer === "building") {
      // set current layer to region
      updateCurrentLayer("region");

      // update filtered building data - make it null to free up memory
      updateFilteredBuildingData(null);

      // update map bounds
      // in this special case, we will use the prabhag bounds because the region bounds are too small
      updateMapBounds(prabhagBounds);

      // update layer number
      decrementLayerNumber(layerNumber);

      // update selected feature name
      updateSelectedFeatureName(selectedRegionName);
    }
    // region -> prabhag
    // layer 3 -> layer 2
    else if (currentLayer === "region") {
      // set current layer to prabhag
      updateCurrentLayer("prabhag");

      // update filtered region data - make it null to free up memory
      updateFilteredRegionData(null);

      // update map bounds
      // in this special case, we will use the ward bounds because the prabhag bounds are too small
      updateMapBounds(wardBounds);

      // update layer number
      decrementLayerNumber(layerNumber);

      // update selected feature name
      updateSelectedFeatureName(selectedPrabhagName);
    }
    // prabhag -> ward
    // layer 2 -> layer 1
    else if (currentLayer === "prabhag") {
      // set current layer to ward
      updateCurrentLayer("ward");

      // update filtered prabhag data - make it null to free up memory
      updateFilteredPrabhagData(null);

      // update map bounds to initial map bounds
      updateMapBounds(initialMapBounds);

      // update layer number
      decrementLayerNumber(layerNumber);

      // update selected feature name
      updateSelectedFeatureName(selectedWardName);

      // update has drilled down state
      updateHasDrilledDown(false);
    }

    // if layer number is 1, then we are at the ward level
    // layer 1 -> NO DRILL UP POSSIBLE
    // this code is not needed because we are disabling the drill up button when layer number is 1
    else if (currentLayer === "ward") {
      // give alert that no more drill up is possible
      alert("No further drill up possible");
    }
  };

  //==============================================================================================================
  //==============================================================================================================
  //
  // END OF MAIN CODE
  //
  //==============================================================================================================
  //==============================================================================================================

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
            dblclick: handleWardDrillDown,
          });
        }}
      />
    );
  };

  // Level 2: PRABHAG
  const PrabhagLayer = () => {
    return (
      <GeoJSON
        data={filteredPrabhagData}
        style={prabhagStyle}
        onEachFeature={(feature, layer) => {
          layer.on({
            click: onFeatureClick,
            dblclick: handlePrabhagDrillDown,
          });
        }}
      />
    );
  };

  // Level 3: REGION
  const RegionLayer = () => {
    return (
      <GeoJSON
        data={filteredRegionData}
        style={regionStyle}
        onEachFeature={(feature, layer) => {
          layer.on({
            click: onFeatureClick,
            dblclick: handleRegionDrillDown,
          });
        }}
      />
    );
  };

  // Level 4: BUILDING
  const BuildingLayer = () => {
    return (
      <GeoJSON
        data={filteredBuildingData}
        style={buildingStyle}
        onEachFeature={(feature, layer) => {
          layer.on({
            click: onFeatureClick,
            dblclick: handleBuildingDrillDown,
          });
        }}
      />
    );
  };

  // render map layers based on current layer state
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
      touchZoom={touchZoom}
      dragging={dragging}
    >
      {/* Sidebar goes here */}
      <Sidebar />

      {/* Layer Control to toggle Tile Layers */}
      <LayersControl position="topright">
        {tileLayers.map((layer, index) => (
          <BaseLayer key={index} name={layer.name} checked={layer.checked}>
            <TileLayer url={layer.url} />
          </BaseLayer>
        ))}
      </LayersControl>

      {/* Add Zoom Reset Control Here */}
      <ResetZoom position="topright" onClick={resetMapZoom} />

      {/* Add info control here */}
      <InfoControl
        position="topright"
        content={{ selectedFeatureName, currentLayer, selectedFeature }}
      />

      {/* Add Drill Up Button Here */}
      {hasDrilledDown && (
        <DrillUpButton
          position="topright"
          content="Drill Up"
          isVisible={hasDrilledDown}
          onClick={handleDrillUp}
        />
      )}

      {/* ward geojson layer */}
      {currentLayer === "ward" && <WardLayer />}

      {/* prabhag geojson layer */}
      {currentLayer === "prabhag" && <PrabhagLayer />}

      {/* region geojson layer */}
      {currentLayer === "region" && <RegionLayer />}

      {/* building geojson layer */}
      {currentLayer === "building" && <BuildingLayer />}

      {/* Fit Map Bounds */}
      {mapBounds.length !== 0 && <ZoomToBounds bounds={mapBounds} />}
    </MapContainer>
  );
}

export default Map;
