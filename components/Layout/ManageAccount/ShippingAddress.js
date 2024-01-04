import { useEffect, React, useState } from "react";
// import { billingValidation } from "../shared/Validation"
// import UserService from "../../services/UserService.js";
import { useDispatch, useSelector } from "react-redux";
// import toasts from "../shared/toast.js";
// import Loader from "../Loader";
// import GooglePlaceAutoComplete from "../GooglePlaceAutoComplete.js";
import { PageLoading } from "@/componentsB2b/Loader/Spinner/PageLoading";


export default function ShippingAddress() {
  const [loading, setLoading] = useState(false);
  const users = useSelector((state) => state.users);

  const [values, setValues] = useState({});
  const [state, setState] = useState(true);
  const [errors, setErrors] = useState({});

  const editBillingDetail = () => {
    setState(false); //set edit button state
  };
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleFormSubmit = (event) => {
    //submit form here
    event.preventDefault();
    // const errorsObj = billingValidation(values);
    // setErrors(errorsObj); //chk validation

    if (Object.keys(errorsObj).length === 0) {
      let Collected_data = {
        type: "shipping",
        customer_id: values.id,
        latitude: values?.latitude,
        longitude: values?.longitude,
        address: {
          postcode: values.postcode,
          apt: values.apt,
          city: values.city,
          state: values.state,
          address: values.address,
          phone: values.phonenumber,
        },
      };

      updateAddress(values.id, Collected_data);
      setLoading(true);
    }
  };
  const addressDetail = (users) => {
    if (users.address !== "undefined" && users?.address.length > 0) {
      setValues({
        address: users?.address[0]?.address?.address,

        city: users?.address[0]?.address?.city,
        postcode: users?.address[0]?.address?.postcode,
        phonenumber: users?.address[0]?.address?.phone,
        apt: users?.address[0]?.address?.apt,
        state: users?.address[0]?.address?.state,
        id: users?.id,
        latitude: users?.address?.latitude,
        longitude: users?.address?.longitude,
      });
    } else {
      setValues({
        address: "",
        city: "",
        postcode: "",
        phonenumber: "",
        apt: "",
        state: "",
        id: users.id,
      });
    }
  };
  // const updateAddress = (id, Collected_data) => {
  //   UserService.updateAddressDetail(id, Collected_data)
  //     .then((response) => {
  //       setLoading(false);
  //       toasts.notifySucces("Address update successfully");
  //     })
  //     .catch((e) => {
  //       setLoading(false);
  //       console.log(e);
  //     });
  // };

  // useEffect(() => {
  //   console.log("users.address=", users.address);
  //   if (users && typeof users.id !== "undefined") {
  //     addressDetail(users);
  //   }
  // }, [!users.address]);

  // useEffect(async () => {

  // }, [errors]);

  const setGoogleAddreesObj = (obj) => {
    setValues({
      ...values,
      city: obj?.city || "",
      address: obj?.formattedAddress || "",
      state: obj?.state || "",
      postcode: obj?.zip || "",
      latitude: obj?.lat || "",
      longitude: obj?.lng || "",
    });
  };

  return (
    <>
      {loading && <PageLoading />}

        <div className="my-schedule shipping-address">
          <div className="top-heading">
            <h3>Shipping Address</h3>
            <a href="#" onClick={() => editBillingDetail()}>
              Edit
            </a>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="form">
              {!state && (
                <div className="feilds">
                  {/* <lable>Enter Address</lable> */}

                  {/* <GooglePlaceAutoComplete
                    setGoogleAddreesObj={setGoogleAddreesObj}
                    setNewAddress={() => {}}
                  /> */}
                </div>
              )}
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Apt, Suite, etc
                </label>
                <input
                  type="text"
                  className={
                    state === true ? "form-control faded" : "form-control"
                  }
                  name="apt"
                  placeholder="enter Apt, Suite, etc"
                  onChange={handleChange}
                  value={values.apt}
                  readOnly={state}
                />
                {errors.apt ? (
                  <div className="shipping_error">{errors.apt}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Address
                </label>
                <input
                  type="text"
                  className={
                    state === true ? "form-control faded" : "form-control"
                  }
                  placeholder="enter address"
                  onChange={handleChange}
                  value={values.address}
                  name="address"
                  readOnly={state}
                />
                {errors.address ? (
                  <div className="shipping_error">{errors.address}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  City
                </label>
                <input
                  type="text"
                  className={
                    state === true ? "form-control faded" : "form-control"
                  }
                  placeholder="enter city"
                  onChange={handleChange}
                  value={values.city}
                  name="city"
                  readOnly={state}
                />
                {errors.city ? (
                  <div className="shipping_error">{errors.city}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  State
                </label>
                <input
                  type="text"
                  className={
                    state === true ? "form-control faded" : "form-control"
                  }
                  placeholder="enter state"
                  onChange={handleChange}
                  value={values.state}
                  name="state"
                  readOnly={state}
                />
                {errors.state ? (
                  <div className="shipping_error">{errors.state}</div>
                ) : null}
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    className={
                      state === true ? "form-control faded" : "form-control"
                    }
                    placeholder="enter zipcode"
                    onChange={handleChange}
                    value={values.postcode}
                    name="postcode"
                    readOnly={state}
                  />
                  {errors.postcode ? (
                    <div className="shipping_error">{errors.postcode}</div>
                  ) : null}
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className={
                      state === true ? "form-control faded" : "form-control"
                    }
                    onChange={handleChange}
                    value={values.phonenumber}
                    placeholder="enter phone number"
                    name="phonenumber"
                    readOnly={state}
                  />
                  {errors.phonenumber ? (
                    <div className="shipping_error">{errors.phonenumber}</div>
                  ) : null}
                </div>
              </div>
              <button type="submit" className="btn" disabled={state === true}>
                UPDATE
              </button>
            </div>
          </form>
        </div>

    </>
  );
}
