import React, { useEffect, useState } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import { activitiesList } from "../../../../../redux/actions/employee";
import moment from "moment";
const paymentOption = [
  {
    value: 1,
    label: "1 week",
  },
  {
    value: 2,
    label: "2 week",
  },
  {
    value: 3,
    label: "3 week",
  },
  {
    value: 4,
    label: "4 week",
  },
];

const RoasterDetail = ({
  values,
  getActivityList,
  activityDataList,
  onChange,
}) => {
  const [activityList, setActivityList] = useState([]);
  const [shift_timings, setTimmings] = useState({
    from: "",
    to: "",
  });
  const format = "h:mm a";

  useEffect(() => {
    getActivityList({
      limit: 1000,
    });
  }, []);

  useEffect(() => {
    if (activityDataList?.data?.length > 0) {
      const options = activityDataList?.data || [];
      const rawOptions = options.map((el) => {
        return {
          ...el,
          label: el.name,
          value: el.id,
        };
      });
      setActivityList(rawOptions);
    }
  }, [activityDataList]);

  useEffect(() => {
    if (values.shift_timings) {
      setTimmings(values.shift_timings);
    }
  }, [values.shift_timings]);

  const handleChange = (key, value) => {
    if (key === "shift_timings") {
      const obj = { ...value };
      if (obj.from && obj.to) {
        onChange("shift_timings", obj);
      }
    }
  };

  const selectedPaymentType = paymentOption.find((el) => {
    return el.value == values.payment_type;
  });

  const selectedActivity = activityList.find((el) => {
    return el.value == values.activity_id;
  });

  return (
    <div className="col-lg-6">
      <div className="group-cat form-desc payrol feature-image text-center mt-4">
        <h3>Roster Details</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        <form>
          {values.emp_code && (
            <div className="mb-3">
              <input
                name="emp_code"
                type="text"
                placeholder="Employee Code"
                className="form-control"
                aria-describedby="emailHelp"
                value={values.emp_code}
                disabled={true}
              />
            </div>
          )}
          <TimePicker
            placeholder="shift time from"
            format={format}
            showSecond={false}
            onChange={(value) => {
              // shift_timings
              const data = {
                ...shift_timings,
                from: value?.format(format) || "",
              };
              setTimmings(data);
              handleChange("shift_timings", data);
            }}
            value={shift_timings.from && moment(shift_timings.from, "HH:mm a")}
          />
          <TimePicker
            placeholder="shift time to"
            format={format}
            showSecond={false}
            onChange={(value) => {
              // shift_timings
              const data = {
                ...shift_timings,
                to: value?.format(format) || "",
              };
              setTimmings(data);
              handleChange("shift_timings", data);
            }}
            value={shift_timings.to && moment(shift_timings.to, "HH:mm a")}
          />
          <div className="mb-3">
            <input
              name="hourly_rate"
              type="number"
              placeholder="Hourly rate"
              className="form-control"
              aria-describedby="emailHelp"
              value={values.hourly_rate}
              onChange={(e) => {
                onChange(e.target.name, e.target.value.trim());
              }}
              min={0}
            />
          </div>
          <Select
            className="basic-multi-select"
            classNamePrefix="select"
            options={activityList}
            placeholder="Select Activity"
            onChange={(value) => {
              onChange("activity_id", value.id);
            }}
            value={selectedActivity}
          />
          <Select
            className="basic-multi-select"
            classNamePrefix="select"
            options={paymentOption}
            placeholder="Select Payment Type"
            value={selectedPaymentType}
            onChange={(value) => {
              onChange("payment_type", value.value);
            }}
          />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = function (state) {
  return {
    activityDataList: state.employee.activities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getActivityList: (data) => {
      return dispatch(activitiesList(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoasterDetail);
