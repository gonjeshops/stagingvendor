import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  createEmployee,
  getSingleEmployee,
  updateEmployeeData,
} from "../../../../../redux/actions/employee";
import Loader from "../../../../common/Loader";
import Address from "./Address";
import BankDetail from "./bankDetail";
import PersonalInfo from "./personalInfo";
import RoasterDetail from "./RoasterDetail";
import { validateEmployeeFields } from "./utill";

const InitialValues = {
  name: "",
  email: "",
  password: "",
  hourly_rate: "",
  shift_timings: "",
  activity_id: "",
  payment_type: "",
  bank_details: {
    account_name: "",
    account_number: "",
    bank_name: "",
    bsb_code: "",
  },
  address: {
    title: "staff-address",
    type: "staff",
    address: {
      house_no: "",
      city: "",
      state: "",
      pin_code: "",
    },
  },
};
const AddOrEditEmployee = ({
  addEmployeeData,
  isEdit,
  getEmployee,
  editEmplopyee,
}) => {
  const [employeeDetails, setEmployeeDetails] = useState(InitialValues);
  const [isLoading, setLoading] = useState(false);
  const route = useRouter();

  useEffect(() => {
    if (route.query.id) {
      setLoading(true);
      getEmployee(route.query.id).then((action) => {
        setLoading(false);
        if (action.payload?.data?.status === 1) {
          let data = action.payload?.data?.data;
          const timings = data.shift_timings?.split("-") || "";
          const timingsObj = {
            from: timings[0],
            to: timings[1],
          };
          data = {
            id: data.id,
            name: data.name,
            email: data.email,
            // password: data.password,
            hourly_rate: data.hourly_rate,
            shift_timings: timingsObj,
            activity_id: data.activity_id,
            payment_type: data.payment_type,
            address: {
              id: data.staff_address.id,
              title: data.staff_address.title,
              type: data.staff_address.type,
              address: data.staff_address.address,
            },
            bank_details: {
              id: data.staff_bank.id,
              account_name: data.staff_bank.account_name,
              account_number: data.staff_bank.account_number,
              bank_name: data.staff_bank.bank_name,
              bsb_code: data.staff_bank.bsb_code,
            },
          };
          setEmployeeDetails(data);
        }
      });
    }
  }, [route]);

  const handleSubmit = () => {
    const error = validateEmployeeFields(employeeDetails);
    if (error) {
      toast.error(error);
    } else {
      let data = { ...employeeDetails };
      data = {
        ...data,
        shop_id: localStorage.getItem("shop_id"),
        shift_timings: `${data.shift_timings.from}-${data.shift_timings.to}`,
      };
      if (isEdit) {
        setLoading(true);
        editEmplopyee(data).then((action) => {
          setLoading(false);
          if (action?.payload?.data?.status === 1) {
            toast.success(action.payload.data.message);
            route.push("/employee");
          }
        });
      } else {
        setLoading(true);
        addEmployeeData(data).then((action) => {
          setLoading(false);
          if (action?.payload?.data?.status === 1) {
            toast.success(action.payload.data.message);
            route.push("/employee");
          } else {
            toast.error(action.payload.data.message);
          }
        });
      }
    }
  };

  const handleChange = (key, value) => {
    const newObj = { ...employeeDetails };
    (newObj[key] = value), setEmployeeDetails(newObj);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="create-inventory add-emp">
        <div className="top-heading">
          <h3>{!isEdit ? "Add Employee" : "Update Employee"}</h3>
        </div>
        <div className="row mb-4 form-desc">
          <PersonalInfo values={employeeDetails} onChange={handleChange} />
          <BankDetail
            values={employeeDetails.bank_details}
            onChange={handleChange}
          />
          <Address values={employeeDetails.address} onChange={handleChange} />
          <RoasterDetail values={employeeDetails} onChange={handleChange} />
          <div className="d-flex add-em-btn justify-content-center">
            <button
              type="button"
              className="btn btn-success w-25"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addEmployeeData: (data) => {
      return dispatch(createEmployee(data));
    },
    getEmployee: (id) => {
      return dispatch(getSingleEmployee(id));
    },
    editEmplopyee: (data) => {
      return dispatch(updateEmployeeData(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddOrEditEmployee);
