import React, { useState } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { useFormik } from "formik";
import { validateEmail } from "../../utils";
import { login } from "../../redux/actions/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Loader from "../common/Loader";
import GifLoader from "../common/GifLoader";

const LoginForm = (props) => {
  const route = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const signInFields = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const data = { ...values };
      Object.keys(data).forEach((el) => (data[el] = data[el].trim()));
      const errors = validateFields(values);
      return errors;
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const validateFields = (fields) => {
    const errors = {};
    if (fields.email.length === 0) {
      errors.email = "This field is required";
    }
    if (validateEmail(fields.email)) {
      errors.email = validateEmail(fields.email);
    }
    if (fields.password.length === 0) {
      errors.password = "This field is required";
    }
    if (fields.password.length < 6) {
      errors.password = "Please add at least 6 charachter.";
    }
    return errors;
  };

  const handleSubmit = (values) => {
    const data = { ...values };
    Object.keys(data).forEach((el) => (data[el] = data[el].trim()));
    setLoading(true);
    props.login(data).then((action) => {
      setLoading(false);
      if (action?.payload?.data?.status === 1) {
        const permission = action?.payload.data.permissions || [];
        const shop_id = action?.payload?.data?.shop_id;
        const shop_status = action?.payload?.data?.shop_status;

        if (permission.includes("store_owner")) {
          if (!!shop_id && !!shop_status) {
            toast.success(action.payload.data.message);
            route.push("/dashboard");
            localStorage.setItem("loginAs", "store_owner");
          } else {
            toast.error("You have no assigned shop for now");
          }
        } else if (permission.includes("staff")) {
          route.push({
            pathname: "/employee_timesheet",
            query: { id: action?.payload?.data?.user_id || "" },
          });
          localStorage.setItem("loginAs", "staff");
        } else {
          toast.error("You don't have permission to login");
        }
      }
    });
  };

  if (isLoading) {
    return <GifLoader />;
  }
  return (
    <>
      <div className="inner-form">
        <div className="top-heading">
          <h3>Sign In</h3>
        </div>
        <form onSubmit={signInFields.handleSubmit}>
          <div className="mb-3">
            <input
              name="email"
              onChange={signInFields.handleChange}
              className="form-control"
              placeholder="Email"
              value={signInFields.values.email}
            />
            {signInFields.errors.email && (
              <div className="formik_error">{signInFields.errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <div className="d-flex password_wrapper">
              <input
                name="password"
                onChange={signInFields.handleChange}
                type={!isVisible ? "password" : "type"}
                className="form-control"
                placeholder="Password"
                value={signInFields.values.password}
              />
              <span>
                <i
                  className={!isVisible ? "fa fa-eye-slash " : "fa fa-eye"}
                  onClick={() => {
                    setVisible(!isVisible);
                  }}
                />
              </span>
            </div>

            {signInFields.errors.password && (
              <div className="formik_error">{signInFields.errors.password}</div>
            )}
          </div>
          <button type="submit" className="btn btn-light w-100">
            Sign in
          </button>
          <p className="text-center mt-3">
            Not a Member{" "}
            <Link href="/vendor">
              <a style={{ color: "#76A713" }}>Sign Up</a>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => {
      return dispatch(login(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
