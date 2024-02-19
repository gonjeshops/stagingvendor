import React, { useEffect, useState } from "react";
import moment from "moment";
import DrawSignatureModel from "../../../common/DrawSignatureModel";

const List = ({
  listData,
  status,
  onUpdateTimings,
  total_hours,
  onReject,
  onAccept,
  employeeCreationDate,
  milageStatus,
}) => {
  const [timeSheetList, setTimeSheetList] = useState(listData);
  const [isOpen, toggleOpen] = useState(false);
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
                  {status === 0 ? (
                    <td>
                      <input
                        type="number"
                        className="table_input"
                        placeholder="Total hours"
                        aria-describedby="emailHelp"
                        min="0"
                        value={item.total_hours}
                        // disabled={
                        //   moment(item.date).isAfter(today, "day") ||
                        //   moment(item.date).isBefore(
                        //     employeeCreationDate,
                        //     "day"
                        //   )
                        // }
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
                  {milageStatus === 1 && <td>{item.milage}</td>}
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

        {status === 1 && (
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
              Accept
            </button>
            <button type="button" className="btn btn-light" onClick={onReject}>
              Reject
            </button>
          </div>
        )}
      </div>

      <DrawSignatureModel
        isOpen={isOpen}
        onClose={() => {
          toggleOpen(!isOpen);
        }}
        onSave={onAccept}
      />
    </div>
  );
};

export default List;
