import { FaClock, FaTrash, FaRegCircle, FaBook, FaCheckCircle } from "react-icons/fa"
import DashboardHeading from "../Workspace/DashboardHeading"
import ImgCard from "../card/ImgCard"
import { useState } from "react"


const Notifications = ({notificationList, modal}) => {

    const [notifications, setNotifications] = useState(notificationList);

    const markAsRead = (notificationId) => {
      // Update the notification as read in the state (you may update this logic)
      const updatedNotifications = notifications.map((section) => {
        return {
          ...section,
          items: section.items.map((notification) => {
            if (notification.id === notificationId) {
              return { ...notification, isRead: !notification.isRead };
            }
            return notification;
          }),
        };
      });
      setNotifications(updatedNotifications);
    };
  
    const deleteNotification = (notificationId) => {
      // Remove the notification from the state (you may update this logic)
      const updatedNotifications = notifications.map((section) => {
        return {
          ...section,
          items: section.items.filter(
            (notification) => notification.id !== notificationId
          ),
        };
      });
      setNotifications(updatedNotifications);
    };

  return (
    <div>
         <DashboardHeading>
            Notifications
        </DashboardHeading>

        <div className="space-y-8">
            {
                notifications?.map(({title, items}, i)=>(
                    <div key={i} className="">
                         <h4 className="border-b text-lg font-semibold py-4">
                            {title}
                        </h4>

                        <div className="">
                            {
                                items?.map(({username, id, userImgUrl, isRead, time, date, message, }, idx)=>(
                                    <div key={idx} className="border-b py-4 bg-light200 hover:bg-light300 duration-300 flex gap-4 ">
                                        <div className="h-12 w-12 flex-shrink-0 rounded-full bg-zinc-300">
                                            <ImgCard src={userImgUrl} alt={'user'}/>
                                        </div>

                                        <div className="w-full">
                                            <div className="flex gap-4 justify-between">
                                                <div className="pb-4 w-full">
                                                    <h6 className="font-medium">{username}</h6>
                                                    <p className="lg:w-[700px]">{message}</p>
                                                </div>
                                                <div onClick={()=>markAsRead(id)} className="hover:scale-110 duration cursor-pointer text-lg  text-green-600">
                                                    {isRead ? <FaCheckCircle /> : <FaRegCircle />}
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                            <div className="flex items-center gap-2">
                                                <FaClock/>
                                                <p>{date},  {time}</p>
                                            </div>
                                            <div className="flex items-center justify-end gap-3 text-base">
                                                {/* <div className="hover:scale-110 duration cursor-pointer  text-blue-600"><FaBook/></div> */}
                                                
                                                <div onClick={()=>deleteNotification(id)} className="hover:scale-110 duration cursor-pointer  text-red-600"><FaTrash/></div>
                                            </div>
                                            </div>

                                        </div>



                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    
                ))

            }


        </div>
    </div>
  )
}

export default Notifications