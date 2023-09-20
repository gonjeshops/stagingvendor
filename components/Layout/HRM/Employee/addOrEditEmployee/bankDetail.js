import React from "react";

const BankDetail = ({ values, onChange }) => {
  const handleChange = (e) => {
    e.preventDefault();
    let data = { ...values };
    data = {
      ...data,
      [e.target.name]: e.target.value,
    };
    onChange("bank_details", data);
  };

  return (
    <div className="col-lg-6">
      <div className="form-desc bank-detal feature-image  payrol gallry">
        <div className="text-center">
          <h3 className="mb-4">Bank Details</h3>
        </div>
        <form>
          <div className="mb-3">
            <input
              name="account_name"
              type="text"
              placeholder="Account Name*"
              className="form-control"
              aria-describedby="emailHelp"
              value={values?.account_name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              name="account_number"
              type="number"
              placeholder="Account Number"
              className="form-control"
              aria-describedby="emailHelp"
              value={values?.account_number}
              onChange={handleChange}
              min={0}
            />
          </div>
          <div className="mb-3">
            <input
              name="bsb_code"
              type="password"
              placeholder="Bsb Code"
              className="form-control"
              aria-describedby="emailHelp"
              value={values?.bsb_code}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="bank_name"
              placeholder="Name of Bank"
              className="form-control"
              aria-describedby="emailHelp"
              value={values?.bank_name}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankDetail;
