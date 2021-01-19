import { createContext } from 'react';

export const StateContext = createContext();
export const DispatchContext = createContext();
export const DBContext = createContext();

export const StateContextProvider = StateContext.Provider;
export const DispatchContextProvider = DispatchContext.Provider;
export const DBContextProvider = DBContext.Provider;

