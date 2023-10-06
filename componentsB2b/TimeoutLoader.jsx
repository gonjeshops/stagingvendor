// import React, { useState, useEffect } from 'react';

// const TimeoutLoader = ({isLoading, setIsLoading, timeoutDuration, onTimeout, children }) => {

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       setIsLoading(false);
//       onTimeout(); // Callback function to handle the timeout event
//     }, timeoutDuration);

//     return () => {
//       clearTimeout(timeoutId); // Clear the timeout when the component unmounts
//     };
//   }, [timeoutDuration, onTimeout]);

//   return isLoading ? <div>Loading...</div> : children;
// };

// export default TimeoutLoader;


import React, { useState, useEffect } from 'react';

const TimeoutLoader = ({ timeoutDuration, onTimeout, children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      onTimeout(); // Callback function to handle the timeout event
    }, timeoutDuration);

    return () => {
      clearTimeout(timeoutId); // Clear the timeout when the component unmounts
    };
  }, [timeoutDuration, onTimeout]);

  return isLoading ? <div>Loading...</div> : children;
};

export default TimeoutLoader;
