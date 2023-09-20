import React, { useCallback, useEffect, useRef, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Signature from "signature_pad";
const DrawSignatureModel = ({ onClose, isOpen, onSave }) => {
  const [signaturePad, setSignaturePad] = useState();
  const canvasRef = useRef(null);

  const readyPad = () => {
    canvasRef.current.getContext("2d").scale(1, 1);
    let tempSignaturePad = new Signature(canvasRef.current, {
      backgroundColor: "#fff",
    });
    setSignaturePad(tempSignaturePad);
  };

  const wrapper = useCallback((node) => {
    canvasRef.current = node;
    if (canvasRef.current) {
      readyPad();
    }
  }, []);

  return (
    <Modal open={isOpen} onClose={onClose} center classNames = {{
      root : "signature_modal_root ",
    }}>
      <div className="modal-body alert-body signature-modal">
        <p className="mt-3 mb-0">Draw Your signature here.</p>

        <div id="signature-pad">
          <canvas ref={wrapper} className="signature-canvas" width="220" height="200"></canvas>
        </div>
        <div className="modal-footer modal-alert border-0 justify-content-center">
          <button type="button" className="btn btn-light" onClick={onClose}>
            Cancel
          </button>{" "}
          <button
            type="button"
            className="btn btn-primary main-button"
            onClick={() => {
              onClose();
              onSave(signaturePad.toDataURL());
            }}
          >
            Save
          </button>{" "}
        </div>
      </div>
    </Modal>
  );
};

export default DrawSignatureModel;
