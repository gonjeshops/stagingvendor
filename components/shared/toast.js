
 
// Importing toastify module
import {toast} from 'react-toastify';
 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
 
 // toast-configuration method,
 // it is compulsory method.
toast.configure()
 
// This is main function

const notifySucces = (message)=>{

      // Calling toast method by passing string
      return(toast.success(message));
  }

  const notifyError=  (message)=>{

    // Calling toast method by passing string
    return(toast.error(message));
}
const toasts = {
    notifySucces,
    notifyError,
  
  };
  
  export default toasts;
