
import { FaClock, FaTrash, FaRegCircle, FaBook, FaCheckCircle } from "react-icons/fa"

const NotificationCard = ({notifications,  setNotifications, id, created_at, message, order_id, shop_id, status, title, updated_at, user_id}) => {

    const markAsRead = (notificationId) => {
      // Update the notification as read in the state (you may update this logic)
      const updatedNotifications = notifications.map((item) => {
        return {
            ...item,
            isRead: item.isRead ? false : true
        } })
      setNotifications(updatedNotifications);
    };
  
    const deleteNotification = (notificationId) => {
      // Remove the notification from the state (you may update this logic)
      const updatedNotifications = notifications.filter(notification => notification.id !== notificationId);
      setNotifications(updatedNotifications);
    };

  return (

      
    <li key={id} className="border-b  py-3 hover:bg-light300 duration-300 flex gap-2 ">
        <div className="h-10 w-10 overflow-hidden flex-shrink-0 rounded-full bg-zinc-300 flex justify-center items-center">
            {/* <ImgCard src={'/profile1.webp'} alt={'user'}/> */}
            <p className="font-bold">{title[0]}</p>
        </div>

        <div className="w-full">
            <div className="flex gap-2">
                <div className="pb-2 w-full">
                    <h6 className="font-medium">{title}</h6>
                    <p className="">{message}</p>
                </div>
                <div onClick={()=>markAsRead(id)} className="hover:scale-110 duration cursor-text-lg  text-green-600">
                    {/* {isRead ? <FaCheckCircle /> : <FaRegCircle />} */}
                </div>
            </div>
            <div className="flex justify-between">
            <div className="flex items-center gap-2">
                <FaClock/>
                <p>{updated_at}</p>
            </div>
            <div className="flex items-center justify-end gap-3 text-base">
                {/* <div className="hover:scale-110 duration cursor-pointer  text-blue-600"><FaBook/></div> */}
                    
        <div onClick={()=>deleteNotification(id)} className="hover:scale-110 cursor-pointer text-red-600"><FaTrash/></div>
            </div>
            </div>
        </div>
    </li>
  )
}

export default NotificationCard
