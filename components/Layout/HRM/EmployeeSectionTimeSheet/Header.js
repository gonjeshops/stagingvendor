import moment from "moment";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Header = ({ onDateChange, creationDate, status }) => {
  const [selectedDate, setSelectedDate] = useState("");
  return (
    <div className="graphs  reports d-flex justify-content-between timesheet_data">
      <div className="employee_status timesheet_status">
        <h3>Employee Time Sheet</h3>
        {status === 0 && (
          <p>
            Status :<span style={{ color: "#629926" }}> Pending</span>
          </p>
        )}
        {status === 1 && (
          <p>
            Status : <span style={{ color: "#629926" }}>Sent For Approval</span>
          </p>
        )}
        {status === 2 && (
          <p>
            Status : <span style={{ color: "#629926" }}>Approved</span>
          </p>
        )}
        {status === 3 && (
          <p>
            Status :{" "}
            <span style={{ color: "#629926" }}>
              Rejected, Please send for approval again
            </span>
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
