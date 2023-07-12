// Contains content for the layers tab

// React Imports
import { useEffect } from "react";

// Import styles
import "../styles/LayersContent.css";

const LayersContent = () => {
  return (
    <div className="layers-content-container">
      <p>
        This dashboard aims to provide an interactive tool to visualize Waste
        Data for the city of Mumbai. The city of Mumbai has been divided into
        administrative hierarchies given below:
      </p>
      <ol>
        <li>
          <strong>Ward</strong>
        </li>
        <li>
          <strong>Prabhag</strong>
        </li>
        <li>
          <strong>Region</strong>
        </li>
        <li>
          <strong>Building</strong>
        </li>
      </ol>
      <p>
        The user can drill down from a higher level in this hierarchy to a lower
        level, to have a more granular view of the data. In the same way, the
        user can drill up from a lower level in the hierarchy to a higher level
        to get a more aggregated view of the data.
      </p>
    </div>
  );
};

export default LayersContent;
