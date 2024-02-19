import React, { useEffect } from 'react';

const RefreshOnFocus = () => {
  useEffect(() => {
    const handleFocus = () => {
      // Reload the page when the window gains focus
      window.location.reload();
    };

    // Add event listener for the 'focus' event
    window.addEventListener('focus', handleFocus);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []); // Empty dependency array ensures that the effect runs once on mount

  return (
    <div>
      {/* Your component content goes here */}
    </div>
  );
};

export default RefreshOnFocus;
