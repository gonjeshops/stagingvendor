import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { AddInventory, FilterSearch } from "../../../../assets";

const Header = ({ onSearch, value }) => {
  const route = useRouter();
  return (
    <div className="graphs reports d-flex justify-content-between">
      <h3>Employess</h3>
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
      <div>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            route.push("/employee/addEmployee");
          }}
        >
          <Image src={AddInventory} alt="" />
          Add Employee
        </button>
      </div>
    </div>
  );
};

export default Header;
