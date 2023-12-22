import { useRouter } from "next/router";
import React, { useState } from "react";
import { FilterSearch, AddInventory, Filter } from "../../../../assets";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Image from "next/image";

const Header = ({
  onSearch,
  isActiveSearch,
  onFilterChange,
  filters,
  onApplyFilters,
  onClearFilters,
  onDateChange,
}) => {
  const [toggle, setToggle] = useState(false);
  const route = useRouter();

  
  return (
    <div className="graphs reports d-flex justify-content-between inventory_header max-w-6xl  mx-auto">
      <div className="search-filter inventory-date-filters gap-2">
        <div className="d-flex align-items-center w-full ">
          <Image src={FilterSearch} alt="" />
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Search.."
            disabled={!isActiveSearch}
            onChange={onSearch}
          />
        </div>
        <button
          type="button"
          className="btn btn-outline-primary bg-background"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <Image src={Filter} alt="" /> Filter
        </button>

        <ul className={`dropdown-menu ${toggle ? "show" : ""}`}>
          <div className="filterby product_filter">
            <div className="d-flex filt">
              <p>Filter By</p>
              <div className="d-flex input-check">
                <div className="form-check form-check-inline">
                  <input
                    name="product_name"
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    value="option1"
                    checked={filters.product_name}
                    onChange={onFilterChange}
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox1">
                    Product Name
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    name="group"
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox2"
                    value="option2"
                    checked={filters.group}
                    onChange={onFilterChange}
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox2">
                    Group
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox2"
                    value="option2"
                    name="published"
                    checked={filters.published}
                    onChange={onFilterChange}
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox2">
                    Published
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox2"
                    value="option2"
                    name="price"
                    checked={filters.price}
                    onChange={onFilterChange}
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox2">
                    Price
                  </label>
                </div>
              </div>
            </div>
            {filters.price == 1 && (
              <div className="d-flex product_price">
                <p>Price</p>

                <div className="form-check form-check-inline price-filter">
                  <input
                    style={{ width: 100 }}
                    type="number"
                    id="inlineCheckbox2"
                    min={0}
                    name="from_price"
                    placeholder="from"
                    onChange={onFilterChange}
                    value={filters.from_price}
                  />
                  <input
                    style={{ width: 100 }}
                    type="number"
                    id="inlineCheckbox2"
                    min={0}
                    name="to_price"
                    placeholder="to"
                    onChange={onFilterChange}
                    value={filters.to_price}
                  />
                </div>
              </div>
            )}
            <div className="start dates d-flex">
              <p>Date</p>
              <div className="filter-by-dates d-flex">
              <div className="product_date_filter">
                <DatePicker
                  placeholderText="from"
                  value={filters.from}
                  maxDate={filters.to && new Date(filters.to)}
                  onSelect={(date) => {
                    onDateChange("from", moment(date).format("YYYY-MM-DD"));
                  }}
                />
                <i className="fas fa-calendar-week" />
              </div>
              <div className="product_date_filter">
                <DatePicker
                  placeholderText="to"
                  value={filters.to}
                  minDate={filters.from && new Date(filters.from)}
                  onSelect={(date) => {
                    onDateChange("to", moment(date).format("YYYY-MM-DD"));
                  }}
                />
                <i className="fas fa-calendar-week" />
              </div>
              </div>
            </div>
            {/* <div className="clearall d-flex">
              <a
                onClick={() => {
                  onClearFilters();
                }}
              >
                <p>Clear all filter</p>
              </a>
              <div className="cancel">
                <a
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  {" "}
                  <strong>Cancel</strong>
                </a>
                <a
                  onClick={() => {
                    onApplyFilters();
                    setToggle(!toggle);
                  }}
                >
                  <span>Apply</span>
                </a>
              </div>
            </div> */}
          </div>
        </ul>
      </div>

      <div>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            route.push("/inventory/addInventory");
          }}
        >
          <Image src={AddInventory} alt="" />
          Add Inventory
        </button>
      </div>
    </div>
  );
};

export default Header;
