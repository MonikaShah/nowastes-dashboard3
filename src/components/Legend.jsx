import React, { useState } from 'react';
import '../styles/Legend.css';

const Legend = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`legend ${expanded ? 'expanded' : ''}`}>
      <button className="expand-button" onClick={toggleExpand}>
        {expanded ? 'Collapse' : 'Waste Generation Legend'}
      </button>
      {expanded && (
        <>
        <br/>
          {/* <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#641a80' }}></div>
            Negligible Generation
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#8c2981' }}></div>
            Minimal Generation 
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#b73779' }}></div>
            Low Generation
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#de4968' }}></div>
            Moderate Generation 
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#f66e5d' }}></div>
            Noticeable Generation 
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#fe9444' }}></div>
            Significant Generation
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ffb62b' }}></div>
            High Generation 
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ffdc27' }}></div>
            Severe Generation
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#f6f64e' }}></div>
            Critical Generation 
          </div> */}
          
          
        <br/>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#006400' }}></div>
            Weight per capita (kg) 1 - 2 Very Low
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#33FF41' }}></div>
            Weight per capita (kg) 3 - 4 Low
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#FFFF00' }}></div>
            Weight per capita (kg) 5 - 6 Moderate 
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#FFA500' }}></div>
            Weight per capita (kg) 7 - 8 High 
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#FF573B' }}></div>
            Weight per capita (kg) 9 - 10 Very High
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#FF0000' }}></div>
            Weight per capita (kg) 11 - 12 Extremely High 
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#CF9FFF' }}></div>
            Data not available
          </div>
        </>
      )}
    </div>
  );
};

export default Legend;
