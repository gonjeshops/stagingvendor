import { useEffect } from 'react';

const useClickOutside = (ref, callback) => {
  
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       callback();
  //     }
  //   };

  //   const handleEscKey = (event) => {
  //     if (event.key === 'Escape') {
  //       callback();
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   document.addEventListener('keydown', handleEscKey);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //     document.removeEventListener('keydown', handleEscKey);
  //   };
  // }, [ref, callback]);
};

export default useClickOutside;
