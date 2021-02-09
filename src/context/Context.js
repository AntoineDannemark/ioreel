import React, { createContext, useState } from 'react'

export const Context = createContext()
export const { Provider } = Context;

const AppContextProvider = (props) => {
    const [dbReady, setDbReady] = useState();
    const [dbInitError, setDbInitError] = useState();

    const resetDbError = () => setDbInitError(null);

    return (
        <Provider value={{ dbReady, setDbReady, dbInitError, resetDbError }}>
            {props.children}
        </Provider>
    )
}

export default AppContextProvider
