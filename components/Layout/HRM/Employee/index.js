import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  employeeList,
  employeeStatus,
  removeEmployee,
} from "../../../../redux/actions/employee.js";
import Loader from "../../../common/Loader.js";
import DeleteModal from "./DeleteModal.js";
import Header from "./Header.js";
import List from "./List.js";
const EmployeePage = ({
  getEmployeeList,
  employeeList,
  changeStatus,
  deleteEmployeeData,
}) => {
  const [searchTerm, setSeachTerm] = useState("");
  const [pageNo, setPage] = useState(1);
  const [isShowDelete, setShowDelete] = useState(false);
  const [idTodelete, setIdtoDelete] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getEmployeeList({
      shop_id: localStorage.getItem("shop_id"),
    }).then(() => {
      setLoading(false);
    });
  }, []);

  const handlePageChange = (page) => {
    setPage(page);
    setLoading(true);
    getEmployeeList({
      shop_id: localStorage.getItem("shop_id"),
      page,
    }).then(() => {
      setLoading(false);
    });
  };

  const handleSearch = (searchWord) => {
    setSeachTerm(searchWord);
    setLoading(true);
    getEmployeeList({
      shop_id: localStorage.getItem("shop_id"),
      keyword: searchWord,
    }).then(() => {
      setLoading(false);
    });
  };

  const handleStatusChange = (id) => {
    setLoading(true);
    changeStatus(id).then((action) => {
      toast.success(action.payload.data.message);
      if (action.payload.data.status === 1) {
        getEmployeeList({
          shop_id: localStorage.getItem("shop_id"),
          keyword: searchTerm,
          page: pageNo,
        }).then(() => {
          setLoading(false);
        });
      }
    });
  };

  const handleDelete = () => {
    setShowDelete(false);
    if (idTodelete) {
      setLoading(true);
      deleteEmployeeData(idTodelete).then((action) => {
        toast.success(action.payload.data.message);
        getEmployeeList({
          page: pageNo,
          shop_id: localStorage.getItem("shop_id"),
          keyword: searchTerm,
        }).then(() => {
          setLoading(false);
        });
      });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Header onSearch={handleSearch} value={searchTerm} />
      <List
        listData={employeeList?.data || {}}
        onStatusChange={handleStatusChange}
        onPageChange={handlePageChange}
        onDelete={(id) => {
          setIdtoDelete(id);
          setShowDelete(true);
        }}
      />
      <DeleteModal
        isOpen={isShowDelete}
        onClose={() => {
          setShowDelete(false);
        }}
        onConfirmDelete={handleDelete}
      />
    </>
  );
};

const mapStateToProps = function (state) {
  return {
    employeeList: state.employee.employeeList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployeeList: (data) => {
      return dispatch(employeeList(data));
    },
    changeStatus: (id) => {
      return dispatch(employeeStatus(id));
    },
    deleteEmployeeData: (id) => {
      return dispatch(removeEmployee(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeePage);
