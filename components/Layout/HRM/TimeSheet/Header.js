import moment from "moment";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Header = ({ onDateChange, creationDate, status }) => {
  const [selectedDate, setSelectedDate] = useState("");
  return (
    <div className="graphs reports d-flex justify-content-between timesheet_data">
      <div className="timesheet_status">
        {" "}
        <h3>Time Sheet</h3>
        {status === 0 && (
          <p className="mb-0" style={{ color: "#629926" }}>
            {" "}
            Pending for Employee Action
          </p>
        )}
        {status === 1 && (
          <p className="mb-0" style={{ color: "#629926" }}>
            {" "}
            Pending for Vendor Action
          </p>
        )}
        {status === 2 && (
          <p className="mb-0" style={{ color: "#629926" }}>
            {" "}
            Approved{" "}
          </p>
        )}
        {status === 3 && (
          <p className="mb-0" style={{ color: "red" }}>
            {" "}
            Rejected
          </p>
        )}
      </div>
      <div className="inventory-filter">
        <span>Filter By Date</span>
        <DatePicker
          placeholderText="Select Date"
          minDate={new Date(creationDate)}
          onSelect={(date) => {
            setSelectedDate(date);
            onDateChange(date);
          }}
          maxDate={new Date()}
          value={selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : ""}
        />
      </div>
    </div>
  );
};

export default Header;
