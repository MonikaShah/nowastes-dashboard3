// This component creates a Leaflet Control to display info about the current layer and selected feature name

// React imports
import { useEffect } from "react";
import PropTypes from "prop-types";

// React Leaflet imports
import { useMap } from 'react-leaflet';
import L from 'leaflet';

// Import styles
import '../styles/InfoControl.css';

// Custom Hook for creating Leaflet Control
const useLeafletControl = (props) => {
  const { position, content } = props;
  const map = useMap();

  useEffect(() => {
    // Define control
    const infoControl = L.control({ position });

    // Method to add control to map
    infoControl.onAdd = function () {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
    };

    // Method to update control content
    infoControl.update = function () {
      this._div.innerHTML = `<h2>${content.currentLayer}</h2>
                             <h3>${content.selectedFeatureName}</h3>`;
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
  content: PropTypes.object
};

InfoControl.defaultProps = {
  position: 'topright',
  content: ''
};

export default InfoControl;
