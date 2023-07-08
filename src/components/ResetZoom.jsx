// This component helps reset the zoom and bounds of the map

// React imports
import { useEffect } from "react";
import PropTypes from "prop-types";

// React Leaflet imports
import { useMap } from "react-leaflet";
import L from "leaflet";

// Import Font Awesome styles
import "@fortawesome/fontawesome-free/css/all.min.css";

// Import styles
import "../styles/ResetZoom.css";

// Custom Hook for creating Leaflet Control
const useLeafletButton = (props) => {
  const { position, onClick } = props;
  const map = useMap();

  useEffect(() => {
    const button = L.control({ position });

    button.onAdd = function () {
      this._btn = L.DomUtil.create("button", "reset-zoom-btn");

      // Create the icon element
      const icon = document.createElement("i");
      icon.className = "fas fa-undo"; // Use Font Awesome class for the reset icon

      // Append the icon element to the button
      this._btn.appendChild(icon);

      this._btn.onclick = onClick;
      return this._btn;
    };

    button.addTo(map);

    return () => {
      button.remove(map);
    };
  }, [map, position, onClick]);
};

// Reset Zoom Component
const ResetZoom = (props) => {
  useLeafletButton(props);
  return null;
};

ResetZoom.propTypes = {
  position: PropTypes.string,
  onClick: PropTypes.func,
};

ResetZoom.defaultProps = {
  position: "topright",
  onClick: () => {},
};

export default ResetZoom;
