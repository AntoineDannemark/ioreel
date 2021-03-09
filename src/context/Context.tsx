import React, { createContext, useState, useContext } from "react";

export interface dbInitError {
  header: string;
  message: string;
}

export type AppContextType = {
  dbType: "local" | "sls" | undefined;
  setDbType: React.Dispatch<React.SetStateAction<"local" | "sls" | undefined>>;
  dbReady: boolean;
  setDbReady: React.Dispatch<React.SetStateAction<boolean>>;
  dbInitError: dbInitError | null;
  setDbInitError: React.Dispatch<React.SetStateAction<dbInitError | null>>;
  resetDbError: () => void;
};

const AppContext = createContext<AppContextType>(null!);
export const useAppContext = () => useContext(AppContext);

const { Provider } = AppContext;

const ContextProvider: React.FC = (props) => {
  const [dbType, setDbType] = useState<"local" | "sls" | undefined>(undefined);
  const [dbReady, setDbReady] = useState<boolean>(false);
  const [dbInitError, setDbInitError] = useState<dbInitError | null>(null);

  const resetDbError: () => void = () => setDbInitError(null);

  return (
    <Provider
      value={{
        dbType,
        setDbType,
        dbReady,
        setDbReady,
        dbInitError,
        setDbInitError,
        resetDbError,
      }}
    >
      {props.children}
    </Provider>
  );
};

export default ContextProvider;
