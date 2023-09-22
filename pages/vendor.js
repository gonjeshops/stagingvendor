import SignUp from "../components/SignUp";
import { SignUpLogo } from "../assets";
import Image from "next/image";

export default function Home() {
  return (
    <section className="vendor-signup">
      <div className="inner-wrap row">
        <div className="col-lg-6 signupp signup-img">
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
          <SignUp />
        </div>
      </div>
    </section>
  );
}
