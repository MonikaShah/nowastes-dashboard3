// this is the store for the app, it is used to store global state

// zustand imports
import { create } from "zustand";

// create the store by creating a custom hook
export const useStore = create((set) => ({
  // here we declare global state variables and their setters
  // these can be accessed from any component using the useStore hook

  // layer number
  layerNum: 1,
  incrementLayerNum: (currentlayerNum) =>
    set({ layerNum: currentlayerNum + 1 }),
  decrementLayerNum: (currentlayerNum) =>
    set({ layerNum: currentlayerNum - 1 }),

  // current layer
  currentLayer: "ward",
  updateCurrentLayer: (newLayer) => set(() => ({ currentLayer: newLayer })),

  // selected feature
  selectedFeature: null,
  updateSelectedFeature: (newFeature) =>
    set(() => ({ selectedFeature: newFeature })),

  // selected feature name
  selectedFeatureName: "Select Feature",
  updateSelectedFeatureName: (newFeatureName) =>
    set(() => ({ selectedFeatureName: newFeatureName })),

  // map bounds
  bounds: [],
  updateBounds: (newBounds) => set(() => ({ bounds: newBounds })),

  // bounds of each layer for drill up
  wardBounds: [],
  updateWardBounds: (newBounds) => set(() => ({ wardBounds: newBounds })),

  prabhagBounds: [],
  updatePrabhagBounds: (newBounds) => set(() => ({ prabhagBounds: newBounds })),

  regionBounds: [],
  updateRegionBounds: (newBounds) => set(() => ({ regionBounds: newBounds })),

  buildingBounds: [],
  updateBuildingBounds: (newBounds) => set(() => ({ buildingBounds: newBounds })),

  // loading state
  isLoading: false,
  updateIsLoading: (newIsLoading) => set(() => ({ isLoading: newIsLoading })),

  // has drilled down
  hasDrilledDown: false,
  updateHasDrilledDown: (hasDrilledDown) =>
    set(() => ({ hasDrilledDown: hasDrilledDown })),

  // show chart
  showChart: false,
  updateShowChart: (newValue) => set(() => ({ showChart: newValue })),

  // state variable for geo data
  // ward data
  wardData: [],
  updateWardData: (newWardData) => set(() => ({ wardData: newWardData })),

  // prabhag data (filtered)
  filteredPrabhagData: [],
  updateFilteredPrabhagData: (newPrabhagData) => set(() => ({ filteredPrabhagData: newPrabhagData })),

  // region data (filtered)
  filteredRegionData: [],
  updateFilteredRegionData: (newRegionData) => set(() => ({ filteredRegionData: newRegionData })),

  // building data (filtered)
  filteredBuildingData: [],
  updateFilteredBuildingData: (newBuildingData) => set(() => ({ filteredBuildingData: newBuildingData })),


  // state variable for geo data names
  // ward name
  selectedWardName: null,
  updateSelectedWardName: (newWardName) => set(() => ({ selectedWardName: newWardName })),
  
  // prabhag name
  selectedPrabhagName: null,
  updateSelectedPrabhagName: (newPrabhagName) => set(() => ({ selectedPrabhagName: newPrabhagName })),

  // region name
  selectedRegionName: null,
  updateSelectedRegionName: (newRegionName) => set(() => ({ selectedRegionName: newRegionName })),

  // building name
  selectedBuildingName: null,
  updateSelectedBuildingName: (newBuildingName) => set(() => ({ selectedBuildingName: newBuildingName })),

  // variables to store actual geo data during drill down
  drilledDownWard: null,
  updateDrilledDownWard: (ward) => set(() => ({ drilledDownWard: ward})),

  drilledDownPrabhag: null,
  updateDrilledDownPrabhag: (prabhag) => set(() => ({ drilledDownPrabhag: prabhag})),

  drilledDownRegion: null,
  updateDrilledDownRegion: (region) => set(() => ({ drilledDownRegion: region})),


  // waste type
  selectedWasteType: null,
  updateSelectedWasteType: (newWasteType) => set(() => ({ selectedWasteType: newWasteType })),

  // global start date and end date
  startDate: "2023-06-30",
  updateStartDate: (newStartDate) => set(() => ({ startDate: newStartDate })),

  endDate: "2023-06-30",
  updateEndDate: (newEndDate) => set(() => ({ endDate: newEndDate })),

  // global samling period
  samplingPeriod: "daily",
  updateSamplingPeriod: (newSamplingPeriod) => set(() => ({ samplingPeriod: newSamplingPeriod })),

  // selected Waste Type
  selectedParameter: "total_waste",
  updateSelectedParameter: (newParameter) => set(() => ({ selectedParameter: newParameter })),
}));
