import React, { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Link from "next/link";
import PhoneInput from "react-phone-number-input";
import { connect } from "react-redux";
import "react-phone-number-input/style.css";
import { Fields } from "./signUpFields";
import { validateSignUpFields } from "./util";
import { register } from "../../redux/actions/auth";
import { toast } from "react-toastify";
import Loader from "../common/Loader";

const SignUp = (props) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const [phone_number, setPhoneNumber] = useState("");
  const signUpFields = useFormik({
    initialValues: {
      business_name: "",
      business_number: "",
      email: "",
      password: "",
      phone_number: "",
      contact_details: "",
    },
    validateOnChange: false,
    validate: (values) => {
      const data = { ...values, phone_number };
      Object.keys(data).forEach((el) => (data[el] = data[el].trim()));
      const errors = validateSignUpFields(data);
      return errors;
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    const data = { ...values, phone_number };
    Object.keys(data).forEach((el) => (data[el] = data[el].trim()));
    setLoading(true);
    props
      .register(data)
      .then((action) => {
        setLoading(false);

        if (action.payload.data.status === 1) {
          toast.success(action.payload.data.message);
          // router.push("/payment");
          router.push("/contractPolicy");
        }
      })
      .catch((err) => {
        console.log("resresresres signUp submit=", err);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="inner-form">
        <div className="top-heading">
          <h3>Sign Up</h3>
        </div>
        <form onSubmit={signUpFields.handleSubmit}>
          {Object.values(Fields).map((field) => {
            return field.name === "phone_number" ? (
              <div className="mb-3" key={field.name}>
                <PhoneInput
                  onChange={(phone) => {
                    setPhoneNumber(phone);
                  }}
                  {...field}
                  international
                  defaultCountry="US"
                  value={phone_number}
                />
                {signUpFields.errors[field.name] && (
                  <div className="formik_error">
                    {signUpFields.errors[field.name]}
                  </div>
                )}
              </div>
            ) : field.name !== "contact_details" ? (
              <div className="mb-3" key={field.name}>
                <input
                  onChange={(e) => {
                    signUpFields.handleChange(e);
                  }}
                  className="form-control"
                  {...field}
                  value={signUpFields.values[field.name]}
                />
                {signUpFields.errors[field.name] && (
                  <div className="formik_error">
                    {signUpFields.errors[field.name]}
                  </div>
                )}
              </div>
            ) : (
              <div className="mb-3" key={field.id}>
                <textarea
                  className="form-control"
                  onChange={signUpFields.handleChange}
                  {...field}
                  value={signUpFields.values[field.id]}
                />
                {signUpFields.errors[field.name] && (
                  <div className="formik_error">
                    {signUpFields.errors[field.name]}
                  </div>
                )}
              </div>
            );
          })}
          <p>
            You are agree to the{" "}
            <a href="#" style={{ color: "#76A713" }}>
              Terms of services{" "}
            </a>
            and{" "}
            <a href="#" style={{ color: "#76A713" }}>
              Privacy Policy
            </a>
          </p>
          <button type="submit" className="btn btn-light w-100">
            Register
          </button>
          <p className="text-center mt-3">
            Already a Member{" "}
            <Link href="/login" style={{ color: "#76A713" }}>Sign In
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = function (state) {
  return {
    isRegistered: state.register.isRegistered,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => {
      return dispatch(register(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
