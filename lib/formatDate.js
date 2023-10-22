export function formatDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
  
    // Ensure that single-digit day, hour, minute, and second have leading zeros
    const formattedDay = (day < 10) ? `0${day}` : day;
    const formattedHours = (hours < 10) ? `0${hours}` : hours;
    const formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const formattedSeconds = (seconds < 10) ? `0${seconds}` : seconds;
  
    return `${month}-${formattedDay}-${year}, ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  
  const now = new Date(); // Create a Date object for the current date and time
  const formattedDate = formatDate(now);
  console.log(formattedDate); // Output: "Oct-22-2023, 15:43:45"
  