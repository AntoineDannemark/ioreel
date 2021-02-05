import React, { createContext } from 'react'

export const DBContext = createContext()
export const DBContextProvider = DBContext.Provider;

const ContextProvider = (props) => {
    return (
        <DBContextProvider>
            {props.children}
        </DBContextProvider>
    )
}

export default ContextProvider
