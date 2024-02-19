import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  orderList,
  orderStatuChange,
  orderStatusList,
} from "../../../redux/actions/orders";
import Loader from "../../common/Loader";
import AcceptOrRejectOrder from "./AcceptOrRejectOrder";
import Header from "./Header";
import List, { Status } from "./List";
const InitialFilters = {
  status: "",
  keyword: "",
};

const OrdersPage = ({
  getOrderList,
  orderList,
  statusList,
  getOrderStatuses,
  updateOrderStatus,
}) => {
  const [pageNo, setPage] = useState(1);
  const [searchTerm, setSeachTerm] = useState("");
  const [filters, setFilters] = useState(InitialFilters);
  const [isOpen, setOpen] = useState(false);
  const [statusDataToUpdate, setStatusData] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrderList({
      ...filters,
      shop_id: JSON.parse(localStorage.getItem("user_detail"))?.shop_id,
    }).then(() => {
      setLoading(false);
    });
    getOrderStatuses({
      limit: 1000,
    });
  }, []);

  const handlePageChange = (page) => {
    setPage(page);
    setLoading(true);
    getOrderList({
      ...filters,
      shop_id: localStorage.getItem("shop_id"),
      page,
    }).then(() => {
      setLoading(false);
    });
  };

  const handleSearch = (searchWord) => {
    const filterObject = { ...filters };
    filterObject.keyword = searchWord;
    setFilters(filterObject);
    applyFilters(filterObject);
  };

  const handleFilterChange = (key, data) => {
    let newFilters = { ...filters };
    newFilters = {
      ...newFilters,
      [key]: data,
    };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filtersData) => {
    setLoading(true);
    getOrderList({
      ...filtersData,
      shop_id: localStorage.getItem("shop_id"),
    }).then((action) => {
      setLoading(false);
    });
  };

  const orders = useMemo(() => {
    return {
      listData: orderList?.data,
    };
  }, [orderList]);

  const statuses = useMemo(() => {
    return statusList?.data?.data || [];
  }, [statusList]);

  const handleConfirm = () => {
    if (statusDataToUpdate) {
      setLoading(true);
      updateOrderStatus(statusDataToUpdate).then((action) => {
        console.log("action.payload.data=", action.payload.data);

        if (action.payload.data.status === 2) {
          if (action.payload.data.data.status.id == Status.accept) {
            toast.success("Order Accepted");
          } else if (action.payload.data.data.status.id == Status.reject) {
            toast.success("Order Rejected");
          }
        } else {
          toast.error(action.payload.data.message);
         console.log('xxx', action.payload.data.message);
        }
        setLoading(false);
        getOrderList({
          ...filters,
          shop_id: localStorage.getItem("shop_id"),
        });
      });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Header
        filters={filters}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        availableStatuses={statuses}
      />
      <List
        listData={orders?.listData || {}}
        onStatusChange={(data) => {
          setOpen(!isOpen);
          setStatusData(data);
        }}
        onPageChange={handlePageChange}
      />
      <AcceptOrRejectOrder
        isOpen={isOpen}
        onClose={() => {
          setOpen(!isOpen);
        }}
        onConfirm={handleConfirm}
        isAccept={statusDataToUpdate?.status === Status.accept}
      />
    </>
  );
};

const mapStateToProps = function (state) {
  return {
    orderList: state.order.orderList,
    statusList: state.order.statusList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderList: (data) => {
      return dispatch(orderList(data));
    },
    getOrderStatuses: (data) => {
      return dispatch(orderStatusList(data));
    },
    updateOrderStatus: (data) => {
      return dispatch(orderStatuChange(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
