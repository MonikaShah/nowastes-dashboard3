// React Imports
import { useState } from "react";
import PropTypes from "prop-types";

// React Leaflet imports
import { useMap } from "react-leaflet";
import L from "leaflet";

// Import styles
import "../styles/Sidebar.css";

// Import icons
import ChartIcon from "../icons/ChartIcon";
import ControlsIcon from "../icons/ControlsIcon";
import LayersIcon from "../icons/LayersIcon";


const Sidebar = (props) => {
  // Define tab content
  const tabContent = [
    {
      title: "Layers",
      icon: <LayersIcon />,
      content: <div>Layers Content</div>,
    },
    {
      title: "Controls",
      icon: <ControlsIcon />,
      content: <div>Controls Content</div>,
    },
    {
      title: "Chart",
      icon: <ChartIcon />,
      content: <div>Chart Content</div>,
    },
  ];

  // State to keep track of active tab
  const [activeTab, setActiveTab] = useState(null);

  // Function to toggle active tab
  const toggleTab = (index) => {
    setActiveTab(activeTab === index ? null : index);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className={`sidebar-tab ${activeTab === 0 ? 'active' : ''}`}>
          <button className="tab-button" onClick={() => toggleTab(0)}>
            {tabContent[0].icon}
          </button>
          {activeTab === 0 && (
            <div className="sidebar-tab-content">
              {tabContent[0].content}
            </div>
          )}
        </div>
        <div className={`sidebar-tab ${activeTab === 1 ? 'active' : ''}`}>
          <button className="tab-button" onClick={() => toggleTab(1)}>
            {tabContent[1].icon}
          </button>
          {activeTab === 1 && (
            <div className="sidebar-tab-content">
              {tabContent[1].content}
            </div>
          )}
        </div>
        <div className={`sidebar-tab ${activeTab === 2 ? 'active' : ''}`}>
          <button className="tab-button" onClick={() => toggleTab(2)}>
            {tabContent[2].icon}
          </button>
          {activeTab === 2 && (
            <div className="sidebar-tab-content">
              {tabContent[2].content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
