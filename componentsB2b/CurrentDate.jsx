import { formatDate } from '@/lib/formatDate';
import  { useState, useEffect } from 'react';

function CurrentDate() {
  // Step 3: Create a state variable to hold the current date
  const [currentDate, setCurrentDate] = useState(new Date());

  // Step 4: Use useEffect to update the current date every second (or as needed)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every 1 second

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Step 5: Render the current date in your component's JSX
  return (
      <p>{formatDate(currentDate)}</p>
  );
}

export default CurrentDate;
