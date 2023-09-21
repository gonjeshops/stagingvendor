import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SendMessage() {
  toast("Wow so easy!");
  return (
    <div>
      <ToastContainer />
    </div>
  );
}
