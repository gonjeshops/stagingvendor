import React from "react";

const Tabs = ({ isCard, setIsCard }) => {
  return (
    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li className="nav-item" role="presentation">
        <button
          className={`nav-link ${isCard ? "active" : ""}`}
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected={isCard}
          onClick={ ()=>{setIsCard(true)}}
        >
          Add Card
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button
          className={`nav-link ${!isCard ? "active" : ""}`}
          id="pills-profile-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-profile"
          type="button"
          role="tab"
          aria-controls="pills-profile"
          aria-selected={!isCard}
          onClick={ ()=>{setIsCard(false)}}
        >
          Banking Details
        </button>
      </li>
    </ul>
  );
};

export default Tabs;
