import Image from "next/image";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import { FilterSearch } from "../../../assets";
import Select from "react-select";
import moment from "moment";
import AddDeliveryCompanyBtn from "../OrdersVendors/AddDeliveryCompanyBtn";

const Header = ({
  onSearch,
  value,
  onFilterChange,
  filters,
  availableStatuses,
}) => {
  const route = useRouter();

  const options = availableStatuses.map((el) => {
    return {
      ...el,
      value: el.id,
      label: el.name,
    };
  });

  const selectedStatus = options.find((el) => {
    return el.id === filters.status;
  }) || {
    value: "",
    label: "All",
  };

  return (
    <div className="graphs reports row  justify-content-between">
      <div className="order_search mb-3 d-flex col-xl-6">
        <div>
          <h3 className="mb-2">Orders</h3>
          <div className="search-filter">
            <div className="d-flex align-items-center w-75">
              <Image src={FilterSearch} alt="" />
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Search.."
                value={value}
                onChange={(e) => {
                  onSearch(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-12 filter_by">
      <div className="text-start">
      <span>Filter By Date</span>
      </div>
        <div className="d-flex mt-1">
          <div className="date_input">
            <DatePicker
              placeholderText="from"
              selected={filters?.from && new Date(filters?.from)}
              isClearable={true}
              maxDate={filters.to && new Date(filters.to)}
              onChange={(date) => {
                onFilterChange(
                  "from",
                  date && moment(date).format("YYYY-MM-DD")
                );
              }}
            />
          </div>
          <div className="date_inputt">
            <DatePicker
              placeholderText="to"
              value={filters.to}
              selected={filters?.to && new Date(filters?.to)}
              isClearable={true}
              minDate={filters.from && new Date(filters.from)}
              onChange={(date) => {
                onFilterChange("to", date && moment(date).format("YYYY-MM-DD"));
              }}
            />
          </div>
        </div>
      </div>

      <div className="inventory-filter order_filters row d-flex justify-between items-center">
        <div className="col-xl-6 pe-0">
          <p className="mb-0">Filter by status</p>
          <Select
            className="basic-multi-select"
            classNamePrefix="select"
            options={[
              {
                value: "",
                label: "All",
              },
              ...options,
            ]}
            placeholder="Select Status"
            value={selectedStatus}
            onChange={(value) => {
              onFilterChange("status", value.value);
            }}
          />
        </div>
      <AddDeliveryCompanyBtn/>

      </div>

    </div>
  );
};
export default Header;
