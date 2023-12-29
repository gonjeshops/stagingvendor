import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  deleteInventory,
  inventoryList,
} from "../../../../redux/actions/inventory";
import DeleteModal from "./DeleteModal";
import Header from "./Header";
import List from "./List";
import { toast } from "react-toastify";
import Loader from "../../../common/Loader";
const InitialFilters = {
  product_name: 1,
  group: 0,
  keyword: "",
  published: 0,
  price: 0,
  from: "",
  to: "",
  from_price: "",
  to_price: "",
};

const InventoryPage = ({
  onAddInventory,
  getInventoryList,
  inventoryData,
  deleteInventoryItem,
  toggleEdit,
}) => {
  const [isShowDelete, setShowDelete] = useState(false);
  const [idTodelete, setIdtoDelete] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [isActiveSearch, setSearchActive] = useState(false);
  const [filters, setFilters] = useState(InitialFilters);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const newFilterObject = Object.assign({}, filters);
    delete newFilterObject.price;
    setLoading(true);
    getInventoryList({
      ...newFilterObject,
      page: activePage,
      shop_id: localStorage.getItem("shop_id"),
    }).then((action) => {
      setLoading(false);
    });
  }, [activePage]);

  const handleDelete = () => {
    setShowDelete(false);

    if (idTodelete) {
      setLoading(true);
      deleteInventoryItem(idTodelete).then((action) => {
        toast.success(action.payload.message);
        const newFilterObject = Object.assign({}, filters);
        delete newFilterObject.price;
        getInventoryList({
          ...newFilterObject,
          page: activePage,
          shop_id: localStorage.getItem("shop_id"),
        });
        setLoading(false);
      });
    }
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleSearch = (e) => {
    let newFilters = { ...filters };
    newFilters = {
      ...newFilters,
      keyword: e.target.value.trim(),
    };
    setFilters(newFilters);
    const newFilterObject = Object.assign({}, newFilters);
    delete newFilterObject.price;
    setLoading(true);
    getInventoryList({
      ...newFilterObject,
      page: activePage,
      shop_id: localStorage.getItem("shop_id"),
    }).then((action) => {
      setLoading(false);
    });
  };

  const handleFilterChange = (e) => {
    const key = e.target.name;
    const value =
      key === "from_price" || key === "to_price"
        ? e.target.value.trim()
        : e.target.checked
        ? 1
        : 0;
    let data = { ...filters };
    data = {
      ...data,
      [key]: value,
    };
    setFilters(data);
    if (key !== "price") {
      applyFilters(data);
    }
  };

  const handleDateChange = (key, data) => {
    let newFilters = { ...filters };
    newFilters = {
      ...newFilters,
      [key]: data,
    };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filtersData) => {
    // const isActtive = filters.product_name || filters.group;
    // setSearchActive(isActtive);
    const newFilterObject = Object.assign({}, filtersData);
    delete newFilterObject.price;
    setLoading(true);
    getInventoryList({
      ...newFilterObject,
      shop_id: localStorage.getItem("shop_id"),
      // page: activePage,
    }).then((action) => {
      setLoading(false);
    });
  };
  const clearFilters = () => {
    setFilters(InitialFilters);
  };

  const searchActive = filters.product_name || filters.group;

  return (
    <>
      {isLoading && <Loader />}
      <div className="create-inventory">
      <div className="top-heading">
          <h3>Inventory</h3>
        </div>
      <Header
        isActiveSearch={searchActive}
        filters={filters}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onApplyFilters={applyFilters}
        onClearFilters={clearFilters}
        onDateChange={handleDateChange}
      />
      <List
        inventoryList={inventoryData?.data?.data || []}
        onDelete={(id) => {
          setIdtoDelete(id);
          setShowDelete(true);
        }}
        activePage={activePage}
        totalData={inventoryData?.data?.total}
        pageLimit={inventoryData?.data?.per_page}
        onPageChange={handlePageChange}
        onUpdateInventory={toggleEdit}
      />
      <DeleteModal
        isOpen={isShowDelete}
        onClose={() => {
          setShowDelete(false);
        }}
        onConfirmDelete={handleDelete}
      />
      </div>
    </>
  );
};

const mapStateToProps = function (state) {
  return {
    inventoryData: state.inventory.inventoryData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInventoryList: (data) => {
      return dispatch(inventoryList(data));
    },
    deleteInventoryItem: (id) => {
      return dispatch(deleteInventory(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryPage);
