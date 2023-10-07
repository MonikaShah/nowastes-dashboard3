import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Import default styles
import 'react-date-range/dist/theme/default.css'; // Import default theme styles
import  '../styles/Daterange.css';
// Zustand imports
import { useStore } from "../store/store.js";

const DateRangePickerComponent = () => {
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

//values from store
   const updateStartDate = useStore((state) => state.updateStartDate);
   const updateEndDate = useStore((state) => state.updateEndDate);


  const handleApply = () => {

    const startDate = selectedRange.startDate;
    //subtracting the time zone offset before converting the date to an ISO string
    startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset());
    const formattedStartDate = startDate.toISOString().slice(0, 10);

    const endDate = selectedRange.endDate;
    //subtracting the time zone offset before converting the date to an ISO string
    endDate.setMinutes(endDate.getMinutes() - endDate.getTimezoneOffset());
    const formattedEndDate = endDate.toISOString().slice(0, 10);

    console.log('Updating start and end dates....');

    console.log('Formatted Start Date:', formattedStartDate);
    console.log('Formatted End Date:', formattedEndDate);

    updateStartDate(formattedStartDate);
    updateEndDate(formattedEndDate);
  };

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="date">
      <button className="expand-button" onClick={toggleExpand}>
        {expanded ? 'Collapse' : 'Set Date Range'}
      </button>
      {expanded && (
        <div className="date-range-picker-container">
        <DateRangePicker
          ranges={[selectedRange]}
          onChange={(ranges) => setSelectedRange(ranges.selection)}
        />
        <button onClick={handleApply} className="apply-button">
          Apply
        </button>
      </div>
      )}
    </div>
  );
};

export default DateRangePickerComponent;
