import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import Pagination from "react-js-pagination";
import Countdown from "react-countdown";
import AssignDeliveryCompanyBtn from "./AssignDeliveryCompanyBtn";
export const Status = {
  accept: 12,
  reject: 11,
};
const List = ({ listData, onPageChange, onStatusChange, setRefresh }) => {

  const route = useRouter();
  return (
    <div className="order-table">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr className="border-none">
              <th scope="col">Order Id</th>
              <th scope="col">Price</th>
              <th scope="col">Store Name</th>
              <th scope="col">Customer Location</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Date</th>
              <th scope="col">Timer</th>
              <th scope="col">Delivery company</th>
              
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {(listData?.data || []).map((item) => {
              return (
                <tr key={item.id} className="border-gray-300">
                  <th scope="row">{item.id}</th>
                  <td>{item.amount}</td>
                  <td>{item.shop.name}</td>
                  <td>{item?.shipping_address?.address || "-"}</td>
                  <td>{item.customer.name}</td>
                  <td>
                    {item.created_at
                      ? moment(item.created_at).format("YYYY-MM-DD")
                      : "-"}
                  </td>
                  <td style={{ color: " #FF0000" }}>
                    {moment(item.timer, "H:m:s", true).isValid() ? (
                      <Countdown
                        date={
                          Date.now() +
                          moment.duration(item.timer).asMilliseconds()
                        }
                        renderer={({ hours, minutes, seconds }) => {
                          return (
                            <span>
                              {hours}:{minutes}:{seconds}
                            </span>
                          );
                        }}
                      />
                    ) : (
                      item.timer
                    )}
                  </td>
                  <td>{item?.delivery_company_name}</td>
                  <td style={{ color: item.status.color }}>
                    {item.status.name}
                  </td>
                  <td className="actions border-none">
                    <AssignDeliveryCompanyBtn item={item} setRefresh={setRefresh}/>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => {
                        route.push({
                          pathname: "/orders/detail",
                          query: { order: item.id },
                        });
                      }}
                    >
                      VIEW
                    </button>
                    <button
                      type="button"
                      className="btn btn-light"
                      disabled={item.status.id === Status.accept}
                      onClick={() => {
                        onStatusChange({
                          id: item.id,
                          status: Status.accept,
                        });
                      }}
                    >
                      ACCEPT
                    </button>
                    <button
                      type="button"
                      className="btn btn-dark"
                      disabled={
                        item.status.id === Status.reject ||
                        item.status.id === Status.accept
                      }
                      onClick={() => {
                        onStatusChange({
                          id: item.id,
                          status: Status.reject,
                        });
                      }}
                    >
                      REJECT
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
