import React from "react";

const Address = ({ values, onChange }) => {
  const { address } = values;

  const handleChange = (e) => {
    let data = { ...values };
    data = {
      ...data,
      address: {
        ...data.address,
        [e.target.name]: e.target.value,
      },
    };
    onChange("address", data);
  };

  return (
    <div className="col-lg-6">
      <div className="group-cat form-desc bank-detal feature-image text-center mt-4">
        <h3>Address</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        <form>
          <div className="mb-3">
            <input
              name="house_no"
              type="text"
              placeholder="House No"
              className="form-control"
              aria-describedby="emailHelp"
              value={address.house_no}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              name="city"
              type="text"
              placeholder="City"
              className="form-control"
              aria-describedby="emailHelp"
              value={address.city}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              name="state"
              type="text"
              placeholder="State"
              className="form-control"
              aria-describedby="emailHelp"
              value={address.state}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              name="pin_code"
              type="number"
              placeholder="Pin code"
              className="form-control"
              aria-describedby="emailHelp"
              value={address.pin_code}
              onChange={handleChange}
              min={0}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Address;
