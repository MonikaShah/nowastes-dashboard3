// React Imports
import { useEffect } from "react";
import PropTypes from "prop-types";

// React Leaflet imports
import { useMap } from "react-leaflet";
import L from "leaflet";

// Import styles
import "../styles/DrillUpButton.css";

// Custom Hook for creating Leaflet Control
const useLeafletButton = (props) => {
  const { position, content, isVisible, onClick } = props;
  const map = useMap();

  useEffect(() => {
    const button = L.control({ position });

    button.onAdd = function () {
      this._btn = L.DomUtil.create("button", "drill-up-btn");
      this._btn.innerHTML = content;
      this._btn.style.display = isVisible ? "block" : "none";
      this._btn.onclick = onClick;
      return this._btn;
    };

    button.addTo(map);

    return () => {
      button.remove(map);
    };
  }, [map, position, content, isVisible, onClick]);
};


// Drill Up Button Component
const DrillUpButton = (props) => {
    useLeafletButton(props);
    return null;
  };
  
  DrillUpButton.propTypes = {
    position: PropTypes.string,
    content: PropTypes.string,
    isVisible: PropTypes.bool,
    onClick: PropTypes.func,
  };
  
  DrillUpButton.defaultProps = {
    position: 'topright',
    content: 'Drill Up',
    isVisible: false,
    onClick: () => {},
  };
  
  export default DrillUpButton;