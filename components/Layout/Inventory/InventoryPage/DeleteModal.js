import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
const DeleteModal = ({ isOpen, onClose, onConfirmDelete }) => {
  return (
    <Modal open={isOpen} onClose={onClose} center>
      <h2></h2>
      <div className="modal-body alert-body">
        <p className="mt-3 mb-0">
          Are You Sure, You want to delete this item?.
        </p>
      </div>
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
          onClick={onConfirmDelete}
        >
          OK
        </button>{" "}
      </div>
    </Modal>
  );
};

export default DeleteModal;
