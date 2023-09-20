import React from "react";

const DetailSection = ({ detail }) => {
  return (
    <div className="time_sheet_details">
      <div className="row">
        <div className="col-md-4">
          <div className="time_sheet_field">
            <label>Vender Name</label>
            <input
              type="text"
              value={detail?.vendor_name || ""}
              disabled={true}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="time_sheet_field">
            <label>Store Name</label>
            <input
              type="text"
              disabled={true}
              value={detail?.store_name || ""}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="time_sheet_field">
            <label>Staff Name</label>
            <input
              type="text"
              disabled={true}
              value={detail?.staff_name || ""}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="time_sheet_field">
            <label>Shift Timing</label>
            <div className="form-row">
              <input
                type="text"
                disabled={true}
                value={detail?.shift_timings?.split("-")[0] || ""}
              />
              <span>TO</span>
              <input
                type="text"
                disabled={true}
                value={detail?.shift_timings?.split("-")[1] || ""}
              />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="time_sheet_field">
            <label>Hourly Rate</label>
            <input
              type="text"
              disabled={true}
              value={detail?.hourly_rate || ""}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="time_sheet_field">
            <label>Activity</label>
            <input type="text" disabled={true} value={detail?.activity || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSection;
