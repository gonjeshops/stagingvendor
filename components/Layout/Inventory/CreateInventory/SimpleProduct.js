import React from "react";

const SimpleProduct = ({ onChange , values}) => {
  return (
    <div className="col-lg-6">
      <div className="product-info feature-image">
        <div className="text-center">
          <h3>Simple Product Information</h3>
          <p>
            Add your simple product description and necessary <br />
            information from here
          </p>
        </div>
        <div className="form">
          <div className="mb-3">
            <input
              type="number"
              placeholder="Price"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value = {values.price}
              onChange={(e) => {
                onChange("price", e.target.value.trim());
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              placeholder="Sale Price"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value = {values.sale_price}
              onChange={(e) => {
                onChange("sale_price", e.target.value.trim());
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              placeholder="Quantity"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value = {values.quantity}
              onChange={(e) => {
                onChange("quantity", e.target.value.trim());
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="SKU"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value = {values.sku}
              onChange={(e) => {
                onChange("sku", e.target.value.trim());
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Width"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value = {values.width}
              onChange={(e) => {
                onChange("width", e.target.value.trim());
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Height"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value = {values.height}
              onChange={(e) => {
                onChange("height", e.target.value.trim());
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Length"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value = {values.length}
              onChange={(e) => {
                onChange("length", e.target.value.trim());
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleProduct;
