import Image from "next/image";
import React from "react";
import { SignUpLogo } from "../assets";
import LoginForm from "../components/Login";
import HeadB2c from "@/components/HeadB2c";

const Login = () => {
  return (
    <>
    <HeadB2c/>
    <section className="vendor-signup">
      <div className="inner-wrap row">
        <div className="col-lg-6 signup-img">
          <div className="logo text-center">
            <Image src={SignUpLogo} alt="" />
          </div>
          <div className="logo-text text-center">
            <h3>
              We are the <span style={{ color: "#76A713" }}>Best</span> Service
              Provider
            </h3>
          </div>
        </div>
        <div className="col-lg-6 signup-form">
          <LoginForm />
        </div>
      </div>
    </section>
    </>

  );
};

export default Login;
