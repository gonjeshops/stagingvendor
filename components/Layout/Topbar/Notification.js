import Image from "next/image";
import React from "react";
import { Notifications } from "../../../assets";

const Notification = () => {
  return (
    <div className="noti dropdown">
      <a
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <Image src={Notifications.src} alt="" height={45} width={45} />
      </a>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <a className="dropdown-item" href="#">
            Action
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Another action
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Something else here
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Notification;
