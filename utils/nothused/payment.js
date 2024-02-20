import React from "react";
import Image from "next/image";
import { SignUpLogo } from "../../assets";
import PaymentModule from "../../components/PaymentModule";

const PaymentMethos = () => {
  return (
    <section className="vendor-signup vendor-bankdetail">
      <div className="inner-wrap row">
        <div className="col-lg-6 banking-bg">
          <div className="logo text-center">
            <Image src={SignUpLogo} alt="" />
          </div>
          <div className="logo-text text-center">
            <h3>
              Welcome to <span style={{ color: "#76A713" }}>Onje</span>{" "}
            </h3>
            <p className="mb-0 add_payment">
              lorem ipsum doller cont dummy text is here
              <br />
              cont dummy text is here
            </p>
          </div>
        </div>
        <div className="col-lg-6 signup-form">
          <PaymentModule/>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethos;
