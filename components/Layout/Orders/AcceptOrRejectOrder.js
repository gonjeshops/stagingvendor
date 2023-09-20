import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
const AcceptOrRejectOrder = ({ isAccept, isOpen, onClose, onConfirm }) => {
  return (
    <Modal open={isOpen} onClose={onClose} center>
      <div className="modal-body alert-body">
        <p className="mt-3 mb-0">
          {`Are You Sure, You want to ${
            isAccept ? "accept" : "reject"
          } this Order?.`}
        </p>
        <div
          className="modal-footer modal-alert border-0 justify-content-center"
          style={{}}
        >
          {" "}
          <button type="button" className="btn btn-light" onClick={onClose}>
            Cancel
          </button>{" "}
          <button
            type="button"
            className=" btn btn-primary main-button"
            onClick={() => {
              onClose();
              onConfirm();
            }}
          >
            OK
          </button>{" "}
        </div>
      </div>
    </Modal>
  );
};

export default AcceptOrRejectOrder;
