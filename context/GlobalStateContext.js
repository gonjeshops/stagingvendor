// GlobalStateContext.js
import { createContext, useContext } from 'react';

const GlobalStateContext = createContext();

export function useGlobalState() {
  return useContext(GlobalStateContext);
}

export default GlobalStateContext;
