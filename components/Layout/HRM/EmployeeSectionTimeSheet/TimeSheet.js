import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import DrawSignatureModel from "../../../common/DrawSignatureModel";
import AddMilage from "./AddMilage";

const TimeSheet = ({
  listData,
  total_hours,
  status,
  onAccept,
  onUpdateTimings,
  milageStatus,
  onAddMilage,
}) => {
  const [timeSheetList, setTimeSheetList] = useState(listData);
  const [isOpen, toggleOpen] = useState(false);
  const [isOpenMilage, setToggleMilage] = useState(false);
  const [milageData, setMilageData] = useState([]);
  const [timeSheetDayId, setDayId] = useState();
  const [milageToDelete, setMilageToDelete] = useState([]);
  const myRef = useRef(null);
  const today = moment();

  useEffect(() => {
    if (listData?.length > 0) {
      setTimeSheetList(listData);
    }
  }, [listData]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    const data = [...timeSheetList];
    data[index].total_hours = value;
    setTimeSheetList(data);
  };

  const handleAddMilage = (data) => {
    const error = validateMilageData(data.data);
    if (error) {
      toast.error(error);
    } else {
      const ObjetData = {
        time_sheet_day_id: timeSheetDayId,
        ...data,
      };
      setToggleMilage(!isOpenMilage);
      onAddMilage(ObjetData);
      setMilageToDelete([]);
    }
  };

  const validateMilageData = (data) => {
    const isValid = data.every((el) => {
      return el.pickup_address && el.destination_address && el.distance;
    });
    return isValid ? "" : "Please add milage detail.";
  };

  let totalMilage = 0;
  timeSheetList?.forEach((el) => {
    totalMilage = totalMilage + el.milage;
  });

  const wrapper = useCallback((node) => {
    myRef.current = node;
  }, []);

  return (
    <div className="order-table inventory-table">
      <div className="table-responsive bg-white pb-3 ">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">Day</th>
              <th scope="col">Date</th>
              <th scope="col">Total hours</th>
              {milageStatus === 1 && <th scope="col">Milage</th>}
            </tr>
          </thead>
          <tbody>
            {(timeSheetList || []).map((item, index) => {
              return (
                <tr key={`key_${item.id}`}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.day}</td>
                  <td>{item.date}</td>
                  {status === 0 || status === 3 ? (
                    <td>
                      <input
                        type="number"
                        className="table_input"
                        placeholder="Total hours"
                        aria-describedby="emailHelp"
                        min="0"
                        value={item.total_hours}
                        disabled={!moment(item.date).isSame(today, "day")}
                        onChange={(e) => {
                          handleChange(e, index);
                        }}
                        onBlur={(e) => {
                          if (e.target.value.trim()) {
                            onUpdateTimings({
                              id: item.id,
                              date: item.date,
                              time: e.target.value.trim(),
                            });
                          }
                        }}
                      />
                    </td>
                  ) : (
                    <td>{item.total_hours}</td>
                  )}
                  {milageStatus === 1 && (
                    <td className="add_milage_wrapper">
                      {item.milage}
                      {(status === 0 || status === 3) &&
                        moment(item.date).isSame(today, "day") && (
                          <button
                            type="button"
                            className="add-milage-btn"
                            onClick={() => {
                              setToggleMilage(!isOpenMilage);
                              setMilageData(item.milage_details);
                              setDayId(item.id);
                            }}
                          >
                            Add Milage
                          </button>
                        )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <hr />
        <div className="d-flex justify-content-end buttns">
          <div className="total_hours">
            Total hours: <span>{total_hours}</span>
          </div>
        </div>

        <div className="d-flex justify-content-end buttns">
          <div className="total_hours">
            Total Milage: <span>{totalMilage}</span>
          </div>
        </div>

        {timeSheetList &&
        timeSheetList?.length > 0 &&
        (status === 0 || status === 3) &&
        moment(timeSheetList[6].date) < moment(new Date()) ? (
          <div className="d-flex justify-content-end buttns">
            <button
              type="button"
              className="btn btn-warning "
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={() => {
                toggleOpen(true);
              }}
            >
              Send For Approval
            </button>
          </div>
        ) : null}
      </div>

      <DrawSignatureModel
        isOpen={isOpen}
        onClose={() => {
          toggleOpen(!isOpen);
        }}
        onSave={onAccept}
      />
      <div ref={wrapper} className="milage-modal" />
      <AddMilage
        isOpen={isOpenMilage}
        milageData={milageData}
        onClose={() => {
          setToggleMilage(!isOpenMilage);
        }}
        onDeleteMilage={(data) => {
          setMilageToDelete(data);
        }}
        onAddMilage={handleAddMilage}
        container={myRef.current}
      />
      {/* </div> */}
    </div>
  );
};

export default TimeSheet;
