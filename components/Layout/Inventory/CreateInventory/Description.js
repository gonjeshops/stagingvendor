import React from "react";

const Description = ({ onChange, values }) => {
  return (
    <div className="col-lg-6">
      <div className="form-desc feature-image  gallry">
        <div className="text-center">
          <h3>Description</h3>
          <p>
            Add your product description and necessary information from here
          </p>
          <form>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                aria-describedby="emailHelp"
                value={values.name}
                onChange={(e) => {
                  onChange("name", e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Unit"
                className="form-control"
                aria-describedby="emailHelp"
                value={values.unit}
                onChange={(e) => {
                  onChange("unit", e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <textarea
                placeholder="Description"
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={values.description}
                onChange={(e) => {
                  onChange("description", e.target.value);
                }}
              />
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input radio"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="publish"
                checked={values.status === "publish"}
                onChange={(e) => {
                  onChange("status", e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Published
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input radio"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="draft"
                checked={values.status === "draft"}
                onChange={(e) => {
                  onChange("status", e.target.value.trim());
                }}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Draft
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Description;
