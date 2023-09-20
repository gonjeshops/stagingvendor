import { useRouter } from "next/router";
import React from "react";
import Pagination from "react-js-pagination";

const List = ({ listData, onPageChange, onStatusChange, onDelete }) => {
  const route = useRouter();
  return (
    <div className="order-table inventory-table emplyee-tab">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email ID</th>
              {/* <th scope="col">Status</th> */}
              <th scope="col">Roster</th>
              <th scope="col">Hourly rate</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {(listData?.data || []).map((item) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{item.name}</th>
                  <td>{item.email}</td>
                  {/* <td style={{ color: item.status ? "#76a713" : "#D70A0A" }}>
                    {item.status ? "Active" : "Inactive"}
                  </td> */}
                  <td>{item.shift_timings || "-"}</td>
                  <td>{`$${item.hourly_rate}`}</td>

                  <td className="actions">
                    <button
                      type="button"
                      className={`btn btn-warning ${
                        item.status ? "deactivate" : ""
                      }`}
                      onClick={() => {
                        onStatusChange(item.id);
                      }}
                      // style={{
                      //   backgroundColor: !item.status ? "" : "red",
                      //   borderColor: !item.status ? "" : "red",
                      // }}
                    >
                      {!item.status ? "Activate" : "Deactivate"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => {
                        route.push({
                          pathname: "/employee/edit",
                          query: { id: item.id },
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={{ backgroundColor: "red", borderColor: "red" }}
                      type="button"
                      className="btn btn-light"
                      onClick={() => {
                        onDelete(item.id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={() => {
                        route.push({
                          pathname: "/timesheet",
                          query: { id: item.id },
                        });
                      }}
                    >
                      Timesheet
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {listData?.total > listData?.per_page && (
        <Pagination
          itemClass="page-item"
          linkClass="page-link"
          activePage={listData.current_page}
          itemsCountPerPage={listData.per_page}
          totalItemsCount={listData.total}
          pageRangeDisplayed={5}
          onChange={onPageChange}
        />
      )}
    </div>
  );
};

export default List;
