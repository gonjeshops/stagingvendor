import React from "react";
import { SignUpLogo } from "../assets";
import Image from "next/image";
import Contract from "../components/Contract";
import HeadB2c from "@/components/HeadB2c";

const ContractPolicy = () => {
  return (
    <>
    <HeadB2c/>
    <section className="vendor-signup vendor-bankdetail contract_policy">
      <div className="inner-wrap row">
        <div className="col-xl-12 banking-bg ">
          <div className="logo text-center">
            <Image src={SignUpLogo} alt="" />
          </div>
          <div className="logo-text text-center">
            <h3>
              Welcome to <span style={{ color: "#76A713" }}>Gonje</span>{" "}
            </h3>
            <p className="mb-0 discription">
              lorem ipsum doller cont dummy text is here
              <br />
              cont dummy text is here
            </p>
          </div>
        </div>
        <div className="col-xl-12 signup-form text-center">
          <Contract />
        </div>
      </div>
    </section>
    </>

  );
};

export default ContractPolicy;
