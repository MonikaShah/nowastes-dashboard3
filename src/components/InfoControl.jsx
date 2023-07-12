// This component creates a Leaflet Control to display info about the current layer and selected feature name

// React imports
import { useEffect } from "react";
import PropTypes from "prop-types";

// React Leaflet imports
import { useMap } from "react-leaflet";
import L from "leaflet";

// Import styles
import "../styles/InfoControl.css";

// Custom Hook for creating Leaflet Control
const useLeafletControl = (props) => {
  const { position, content } = props;
  const map = useMap();

  useEffect(() => {
    // Define control
    const infoControl = L.control({ position });

    // Method to add control to map
    infoControl.onAdd = function () {
      this._div = L.DomUtil.create("div", "info");
      this.update();
      return this._div;
    };

    // Method to update control content
    infoControl.update = function () {
      const feature = content.selectedFeature;
      const dryWaste = feature?.properties?.dry_waste || "-NA-";
      const wetWaste = feature?.properties?.wet_waste || "-NA-";
      const totalWaste = feature?.properties?.total_waste || "-NA-";
      const population = feature?.properties?.population || "-NA-";
      const weight = feature?.properties?.weight || "-NA-";

      this._div.innerHTML = `<h2>${content.currentLayer}</h2>
                         <h3>${content.selectedFeatureName}</h3>
                         <p><b>Dry Waste:</b> ${dryWaste}</p>
                         <p><b>Wet Waste:</b> ${wetWaste}</p>
                         <p><b>Total Waste:</b> ${totalWaste}</p>
                         <p><b>Population:</b> ${population}</p>
                         <p><b>Weight per capita:</b> ${weight}</p>`;
    };

    // Add control to map
    infoControl.addTo(map);

    // Cleanup on unmount
    return () => {
      infoControl.remove(map);
    };
  }, [map, position, content]);
};

// Info Control Component
const InfoControl = (props) => {
  useLeafletControl(props);
  return null;
};

InfoControl.propTypes = {
  position: PropTypes.string,
  content: PropTypes.object,
};

InfoControl.defaultProps = {
  position: "topright",
  content: "",
};

export default InfoControl;
