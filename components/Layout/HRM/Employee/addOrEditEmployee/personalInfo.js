import React from "react";

const PersonalInfo = ({ values,onChange}) => {
  return (
    <div className="col-lg-6">
      <div className="group-cat form-desc bank-detal feature-image text-center mt-4">
        <h3>Information</h3>
        <p>Add your staff information and create a new staff from here</p>
        <form>
          <div className="mb-3">
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="form-control"
              aria-describedby="emailHelp"
              value = {values.name}
              onChange={(e)=>{
                onChange(e.target.name, e.target.value.trim())
              }}
            />
          </div>
          <div className="mb-3">
            <input
              name="email"
              type="text"
              placeholder="Email address"
              className="form-control"
              aria-describedby="emailHelp"
              value = {values.email}
              onChange={(e)=>{
                onChange(e.target.name, e.target.value.trim())
              }}
            />
          </div>
          <div className="mb-3">
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="form-control"
              aria-describedby="emailHelp"
              value = {values.password}
              onChange={(e)=>{
                onChange(e.target.name, e.target.value.trim())
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
