import Workspace from "@/componentsB2b/Workspace/Workspace";
import Notifications from "@/componentsB2b/Notifications/Notifications";
import { notificationList } from "@/data/notificationList";

const NotificationsPage = () => {

 return (
        <Workspace>
            <Notifications notificationList={notificationList}/>
        </Workspace>
  )    
}

export default NotificationsPage;

