import { createContext } from 'react';
import { IState } from '../core/interfaces';

// TODO Check reel benefit of splitting State & Dispatch contexts (supposedly perfs due to passing an object)
export const StateContext = createContext<IState>({} as IState);
// TODO Replace any with appropriate type
export const DispatchContext = createContext<React.Dispatch<any>|null>(null);
export const DBContext = createContext<any>(null);

export const StateContextProvider = StateContext.Provider;
export const DispatchContextProvider = DispatchContext.Provider;
export const DBContextProvider = DBContext.Provider;

