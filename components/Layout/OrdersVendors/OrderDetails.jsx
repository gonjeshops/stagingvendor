import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import {
  orderDetail,
  orderStatuChange,
  orderStatusList,
} from "@/redux/actions/orders";
import Select from "react-select";
import { toast } from "react-toastify";
import Countdown from "react-countdown";
import moment from "moment";
import Loader from "@/components/common/Loader";

import GoogleMapComponent from "./googlemap";
import PackingSlip from "../PackingSlip";
import { currency } from "@/lib/currency";
import Image from "next/image";



const OrderDetails = ({path, dataObject,   getOrderDetail,
  orderData,
  statusList,
  getOrderStatuses,
  updateOrderStatus, }) => {

    const route = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [directions, setDirections] = useState();

  useEffect(() => {
    const { query } = route;
    if (dataObject?.id) {
      setLoading(true);
      getOrderDetail(dataObject?.id).then(() => {
        setLoading(false);
      });
      getOrderStatuses({
        limit: 1000,
      }).then(() => {
        setLoading(false);
      });
    }
  }, [dataObject]);

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
console.log('dataObject', dataObject)

    const data  = dataObject || {};
    return {
      id: data?.id || "",
      status: data?.status || '',
      shop: {name: data?.shop_name, address: data?.shop_address, id: data?.shop_id},
      order_status: data?.order_status || '',
      barcode_number: data?.barcode_number || '',
      tracking_number: data?.tracking_number || '',
      consignment_number: data?.consignment_number || '',
      products: JSON.parse(data?.cart_items) || [],
      timer: data?.timer || "",
      buyer_details: data?.buyer_details || {},
      tax: data?.sales_tax || 0,
      delivery_fee: data?.delivery_fee || 0,
      delivery_company_name: data?.delivery_company_name || '',
      discount: data?.discount || 0,
      total: (data?.subtotal || 0) + (data?.sales_tax || 0) + (data?.delivery_fee || 0) - ( data?.discount || 0) || 0,
      subtotal: data?.subtotal || "0",
      billing_address: data?.billing_address || "",
      shipping_address: data?.shipping_address || "",
      origin: {
        latitude: parseFloat(data?.shop?.latitude) || "",
        longitude: parseFloat(data?.shop?.longitude) || "",
      },
      destination: {
        latitude: parseFloat(data?.latitude) || "",
        longitude: parseFloat(data?.longitude) || "",
      },
    };
  }, [dataObject]);

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
          <div className="order-view d-flex row space-y-4">
            <div className="col-lg-5">
              <p className="mb-0">
                Order Id. <span>{detail.id}</span>
              </p>
              Status{" "}
              <strong style={{ color: detail.status.color }}>
                {detail.status}
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
            <div className="col-lg-7 flex gap-4 sm:flex-row flex-col">
              <PackingSlip orderDetails={detail}/>
              <Select
                className="basic-multi-select w-full"
                classNamePrefix="select"
                options={statusOptions}
                placeholder="Update Status"
                onChange={handleStatusChange}
              />
            </div>
          </div>

          <div className="order-view mb-5">
            <table className="table products_table ">
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
                    <tr className="text-cente" key={`key_${item?.id}`}>
                      <td className="w-20 h-20 overflow-hidden p-0 m-0">
                        <Image width={200} height={200} src={item?.product?.image?.thumbnail} alt="" className="w-32 h-32 object-cover"/>
                      </td>
                      <td scope="row">
                        {item?.name} <strong>x</strong>
                        {item?.quantity}
                      </td>
                      <td>{currency()}{item?.price}</td>
                      <td className="product-price">{currency()}{item?.subtotal}</td>
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
                        {currency()}{detail?.subtotal}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Tax</th>
                        <td className="product-price">{currency()}{detail?.tax}</td>
                      </tr>
                      <tr>
                        <th scope="row">Delivery fee</th>
                        <td className="product-price">
                          {" "}
                          {currency()}{detail?.delivery_fee}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Discount</th>
                        <td className="product-price"> {currency()}{detail?.discount}</td>
                      </tr>
                      <tr>
                        <th scope="row">Total</th>
                        <td className="product-price font-bold"> {currency()}{detail?.total}.00</td>
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
                    <th scope="row">{detail?.billing_address ? Object.key(detail?.billing_address).join(', '): ''}</th>
                    <td className="product-price">{
                    detail?.shipping_address ? Object.key(detail?.shipping_address).join(', '): ''}
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails) 