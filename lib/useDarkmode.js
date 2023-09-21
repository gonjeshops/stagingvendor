'use client'

import { useState, useEffect } from "react";
import {FiSun, FiMoon} from 'react-icons/fi'


export const useDarkmode = (lightRate, darkRate) => {
    // State variable to hold the background lightness percentage
  const [bgLightness, setBgLightness] = useState(''); // Default background lightness (lightRate% for light mode, darkRate% for dark mode)
  const [bgLightnessLoaded, setBgLightnessLoaded] = useState(false);

  const toggleDarkMode = () => {
    const newLightness = bgLightness === lightRate ? darkRate : lightRate;
    setBgLightness(newLightness);
    localStorage.setItem('bgLightness', newLightness.toString());
  };

  useEffect(() => {
    // Function to get the stored background lightness from local storage (client-side only)
    const getStoredBgLightness = () => {
      const storedBgLightness = parseInt(localStorage.getItem('bgLightness'), 10);
      return isNaN(storedBgLightness) ? lightRate : storedBgLightness;
    };

    // Get the background lightness from local storage when on the client-side
    const storedBgLightness = getStoredBgLightness();

    // Set the background lightness state
    setBgLightness(storedBgLightness);
   
    // Update the CSS variable to apply the initial background color
    document.documentElement.style.setProperty('--bg-lightness', `${storedBgLightness}%`);
    setBgLightnessLoaded(true); // Mark that bgLightness has been loaded
  }, [lightRate]);

  useEffect(() => {
    if (bgLightnessLoaded) {
      document.documentElement.style.setProperty('--bg-lightness', `${bgLightness}%`);
    }
  }, [bgLightness, bgLightnessLoaded]);



 const themeBtn = <button onClick={toggleDarkMode} className=" text-yellow-500">
          {bgLightness===darkRate  ? <FiSun /> : <FiMoon />}
        </button>

return {
    bgLightness, bgLightnessLoaded, themeBtn
}
}