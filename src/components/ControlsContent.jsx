// Contains content for the controls tab

// React Imports
import { useState } from "react";

// zustand Imports
import { useStore } from "../store/store.js";

// Library Imports
import DatePicker from "react-datepicker";

// utils Imports
import formatDate from "../utils/formatDate.js";
import { format } from "date-fns";

// Import styles
import "../styles/ControlsContent.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

// Custom Date Picker component
const CustomDatePicker = ({
  idPrefix,
  label,
  dateValue,
  onDateChange,
  minDate,
  maxDate,
}) => (
  <>
    <label htmlFor={`${idPrefix}-date`}>{label}</label>
    <div className="datepicker-container">
      <DatePicker
        autocomplete="off" // to disable the browser's autocomplete
        name={Math.random().toString()} // to disable the browser's autocomplete
        dateFormat="yyyy-MM-dd"
        id={`${idPrefix}-date`}
        selected={dateValue}
        onChange={onDateChange}
        minDate={minDate}
        maxDate={maxDate}
        showYearDropdown
        showMonthDropdown
      />
    </div>
  </>
);

// Custom Sampling Period Selector component
const SamplingPeriodSelector = ({ value, onChange }) => (
  <>
    <label htmlFor="sampling-period">Sampling Period</label>
    <select
      id="sampling-period"
      name="sampling-period"
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    >
      <option value="daily">Daily</option>
      <option value="monthly">Monthly</option>
      <option value="yearly">Yearly</option>
    </select>
  </>
);

// Custom Parameter Selector component
const ParameterSelector = ({ value, onChange }) => (
  <>
    <label htmlFor="parameter">Parameter</label>
    <select
      id="parameter"
      name="parameter"
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    >
      <option value="dry_waste">Dry Waste</option>
      <option value="wet_waste">Wet Waste</option>
      <option value="total_waste">Total Waste</option>
      <option value="population">Population</option>
      <option value="weight">Weight</option>
    </select>
  </>
);

// ControlsContent component
const ControlsContent = () => {
  // default start date for the date pickers
  const defaultStartDate = new Date("2023-06-30");
  const defaultEndDate = new Date("2023-06-30");

  // local state for the date pickers and sampling period selector
  const [startDateValue, setStartDateValue] = useState(
    formatDate(defaultStartDate)
  );
  const [endDateValue, setEndDateValue] = useState(formatDate(defaultEndDate));
  const [localSamplingPeriod, setLocalSamplingPeriod] = useState("daily");

  // global state for the date pickers and sampling period selector
  const updateStartDate = useStore((state) => state.updateStartDate);
  const updateEndDate = useStore((state) => state.updateEndDate);
  const updateSamplingPeriod = useStore((state) => state.updateSamplingPeriod);

  // local state for the parameter selector
  const [localParameter, setLocalParameter] = useState("weight");

  // global state for the parameter selector
  const updateSelectedParameter = useStore(
    (state) => state.updateSelectedParameter
  );

  // Function to handle the submit event of the form
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    updateStartDate(startDateValue);
    updateEndDate(endDateValue);
    updateSamplingPeriod(localSamplingPeriod);
    updateSelectedParameter(localParameter);
    console.log("Form submitted");
    console.log("Start Date: ", startDateValue);
    console.log("End Date: ", endDateValue);
    console.log("Sampling Period: ", localSamplingPeriod);
    console.log("Parameter: ", localParameter);
  };

  return (
    <div>
      <form className="controls" onSubmit={handleSubmit}>
        <div>
          <CustomDatePicker
            idPrefix="start"
            label="Select Start Date:"
            dateValue={new Date(startDateValue)}
            onDateChange={(date) => {
              const formattedDate = formatDate(date);
              if (new Date(formattedDate) <= new Date(endDateValue)) {
                setStartDateValue(formattedDate);
              } else {
                alert("Start Date cannot be greater than End Date.");
              }
            }}
            minDate={new Date("2020-01-01")}
            maxDate={new Date(endDateValue)} // max date for startDate is endDate
          />

          <CustomDatePicker
            idPrefix="end"
            label="Select End Date:"
            dateValue={new Date(endDateValue)}
            onDateChange={(date) => {
              const formattedDate = formatDate(date);
              if (new Date(formattedDate) >= new Date(startDateValue)) {
                setEndDateValue(formattedDate);
              } else {
                alert("End Date cannot be less than Start Date.");
              }
            }}
            minDate={new Date(startDateValue)} // min date for endDate is startDate
            maxDate={new Date("2023-06-30")}
          />

          <SamplingPeriodSelector
            value={localSamplingPeriod}
            onChange={setLocalSamplingPeriod}
          />

          <ParameterSelector
            value={localParameter}
            onChange={setLocalParameter}
          />

        </div>
        <button className="submitbtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ControlsContent;
