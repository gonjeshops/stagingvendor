import React from "react";
import Dropzone from "react-dropzone";
import { UploadProSvg } from "../../../../assets";

const Variant = ({ item, index, onChangeVariants }) => {
  return (
    <div className="pt-4" key={`${item.name}_key`}>
      <div className="form-desc group-cat mt-0 product-info feature-image">
        <div className="text-center">
          <h3>{index + 1} VARIANT</h3>
        </div>
        <p className="text-left ms-2">Variant : {item.title}</p>
        <form className="pt-2">
          <div className="row">
            <div className="col">
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="form-control"
                aria-describedby="emailHelp"
                value={item.price}
                onChange={onChangeVariants}
                min={0}
              />
            </div>
            <div className="col">
              <input
                type="number"
                name="sale_price"
                placeholder="Sale Prie"
                className="form-control"
                aria-describedby="emailHelp"
                onChange={onChangeVariants}
                value={item.sale_price}
                min={0}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                placeholder="SKU"
                className="form-control"
                aria-describedby="emailHelp"
                onChange={onChangeVariants}
                name="sku"
                value={item.sku}
              />
            </div>
            <div className="col">
              <input
                name="quantity"
                type="number"
                placeholder="Quantity"
                className="form-control"
                aria-describedby="emailHelp"
                onChange={onChangeVariants}
                value={item.quantity}
                min={0}
              />
            </div>
          </div>
          <div className="form-check form-check-inline">
            <input
              name="is_disable"
              className="form-check-input radio"
              type="checkbox"
              id="inlineRadio2"
              checked={item.is_disable}
              // onChange={onChangeVariants}
              onChange={onChangeVariants}
              // onClick={(e)=>{
              //   e.stopPropagation()
              //   onChangeVariants(e)}}
              // value="draft"
              // onChange={(e)=>{
              //   console.log("variation checkbox ==",e.target.checked )
              //   onChange("status", e.target.value.trim())
              // }}
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              Disable This Variant
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Variant;
