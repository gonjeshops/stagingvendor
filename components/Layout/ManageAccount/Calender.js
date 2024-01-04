import Image from "next/image";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { useEffect, useState } from "react";
// import { retrieveDeliveryDate } from "../../actions/deliverydates";
import { useDispatch, useSelector } from "react-redux";


export default function Calender() {
  const [deliveryData, setDeliveryData] = useState();
  const dispatch = useDispatch();
  const deliverydates = useSelector((state) => state.deliverydates);

  // useEffect(() => {
  //   const shop_id = localStorage.getItem("shop_id");
  //   dispatch(retrieveDeliveryDate({ shop_id: shop_id }));
  // }, [dispatch]);

  return (
    <>
      <div className="bg-background">
        <div className="my-schedule">
          <div className="top-heading">
            <h3>MY Schedule</h3>
          </div>
          <Calendar
            className="date_container"
            tileClassName={({ date, view }) => {
              // if (
              //   moment(date).format("YYYY-MM-DD") ==
              //   moment(deliverydates.current_date).format("YYYY-MM-DD")
              // ) {
              //   return "highlight";
              // } else if (
              //   moment(date).format("YYYY-MM-DD") ==
              //   moment(deliverydates.next_delivery_date).format("YYYY-MM-DD")
              // ) {
              //   return "deliverydate";
              // }
            }}
          />
          {/* <div className="text-center">
            <Image
              src="/assets/images/calender.png"
              alt=""
              height={300}
              width={400}
            />
          </div> */}
          <div className="build-box text-center">
            <span>Build Your box</span>
            <div className="deli-time d-flex justify-content-center align-items-start">
              <Image
                src="/assets/images/new-cart.svg"
                alt=""
                height={20}
                width={20}
              />
              <p>
                Next Delivery :{" "}
                <span style={{ color: "70AB4B" }}>28 Oct - 30 Oct</span>
              </p>
            </div>
          </div>
          <div className="index d-flex justify-content-evenly">
            <div className="white-box d-flex justify-content-center align-items-inherit">
              <Image
                src="/assets/images/w-box.svg"
                alt=""
                height={18}
                width={18}
              />
              <span>Build Your box</span>
            </div>
            <div className="white-box d-flex justify-content-center align-items-inherit">
              <Image
                src="/assets/images/grocery-circle.svg"
                alt=""
                height={18}
                width={18}
              />
              <span>Grocery on the way</span>
            </div>
            <div className="white-box d-flex justify-content-center align-items-inherit">
              <Image
                src="/assets/images/grocery-delivered.svg"
                alt=""
                height={18}
                width={18}
              />
              <span>Grocery Delivered</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
