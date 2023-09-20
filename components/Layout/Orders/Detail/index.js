import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import {
  orderDetail,
  orderStatuChange,
  orderStatusList,
} from "../../../../redux/actions/orders";
import Select from "react-select";
import { toast } from "react-toastify";
import Countdown from "react-countdown";
import moment from "moment";
import Loader from "../../../common/Loader";
import { Map_Marker_Svg } from "../../../../assets";
import GoogleMapComponent from "./googlemap";

const OrderDetailPage = ({
  getOrderDetail,
  orderData,
  statusList,
  getOrderStatuses,
  updateOrderStatus,
}) => {
  const route = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [directions, setDirections] = useState();
  useEffect(() => {
    const { query } = route;
    if (query.order) {
      setLoading(true);
      getOrderDetail(query.order).then(() => {
        setLoading(false);
      });
      getOrderStatuses({
        limit: 1000,
      }).then(() => {
        setLoading(false);
      });
    }
  }, [route]);

  const handleStatusChange = (data) => {
    const { query } = route;
    const dataToSent = {
      id: query.order,
      status: data.value,
    };
    setLoading(true);
    updateOrderStatus(dataToSent).then((action) => {
      toast.success(action.payload.data.message);
      getOrderDetail(query.order).then(() => {
        setLoading(false);
      });
    });
  };

  const detail = useMemo(() => {
    const { data } = orderData || {};
    return {
      id: data?.id || "",
      status: data?.status || {},
      products: data?.products || [],
      timer: data?.timer || "",
      customer: data?.customer || {},
      tax: data?.sales_tax || "0",
      delivery_fee: data?.delivery_fee || "0",
      discount: data?.discount || "0",
      total: data?.paid_total || "0",
      subtotal: data?.amount || "0",
      billing_address: data?.billing_address,
      shipping_address: data?.shipping_address,
      origin: {
        latitude: parseFloat(data?.shop?.latitude) || "",
        longitude: parseFloat(data?.shop?.longitude) || "",
      },
      destination: {
        latitude: parseFloat(data?.latitude) || "",
        longitude: parseFloat(data?.longitude) || "",
      },
    };
  }, [orderData]);

  const statusOptions = useMemo(() => {
    return (
      statusList?.data?.data.map((el) => {
        return {
          ...el,
          value: el.id,
          label: el.name,
        };
      }) || []
    );
  }, [statusList]);

  return (
    <>
      {isLoading && <Loader />}

      <div className="order-id-r  order-table">
        <div className="col-lg-9 col-md-12 mx-auto">
          <div className="order-view d-flex row">
            <div className="col-lg-5">
              <p className="mb-0">
                Order Id. <span>{detail.id}</span>
              </p>
              Status{" "}
              <strong style={{ color: detail.status.color }}>
                {detail.status.name}
              </strong>
              Timer
              <strong style={{ color: " #FF0000" }}>
                {moment(detail.timer, "H:m:s", true).isValid() ? (
                  <Countdown
                    date={
                      Date.now() +
                      moment.duration(detail.timer).asMilliseconds()
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
                  detail.timer
                )}
              </strong>
            </div>
            <div className="col-lg-7">
              <Select
                className="basic-multi-select"
                classNamePrefix="select"
                options={statusOptions}
                placeholder="Update Status"
                onChange={handleStatusChange}
              />
            </div>
          </div>

          <div className="order-view mb-5">
            <table className="table products_table">
              <thead>
                <tr>
                  <th></th>
                  <th scope="col">Products</th>
                  <th scope="col">Unit Price</th>

                  <th className="product-price" scope="col">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {(detail?.products || []).map((item) => {
                  return (
                    <tr className="product_detail" key={`key_${item.id}`}>
                      <td style={{ width: "10%" }}>
                        <img src={item.image.thumbnail} alt="" />
                      </td>
                      <td scope="row">
                        {item.name} <strong>x</strong>
                        {item.pivot.order_quantity}
                      </td>
                      <td>{item.pivot.unit_price}</td>
                      <td className="product-price">{item.pivot.subtotal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="order-subtotal row">
              <div className="col-lg-7" />
              <div className="col-lg-5">
                <div className="cover">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Sub total</th>
                        <th className="product-price" scope="col">
                          {detail?.subtotal}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Tax</th>
                        <td className="product-price">{detail?.tax}</td>
                      </tr>
                      <tr>
                        <th scope="row">Delivery fee</th>
                        <td className="product-price">
                          {" "}
                          {detail?.delivery_fee}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Discount</th>
                        <td className="product-price"> {detail?.discount}</td>
                      </tr>
                      <tr>
                        <th scope="row">Total</th>
                        <td className="product-price"> {detail?.total}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="billing-info">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Billing Address</th>
                    <th scope="col" className="product-price">
                      Shipping Address
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{detail?.billing_address?.address}</th>
                    <td className="product-price">
                      {detail?.shipping_address?.address}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <GoogleMapComponent
            isMarkerShown={true}
            directions={directions}
            setDirections={setDirections}
            origin={detail.origin}
            destination={detail.destination}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = function (state) {
  return {
    orderData: state.order.orderDetail,
    statusList: state.order.statusList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderDetail: (id) => {
      return dispatch(orderDetail(id));
    },
    getOrderStatuses: (data) => {
      return dispatch(orderStatusList(data));
    },
    updateOrderStatus: (data) => {
      return dispatch(orderStatuChange(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailPage);
