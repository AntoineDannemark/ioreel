import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit"
import rootReducer, { RootState } from "./rootReducer"
import logger from 'redux-logger'

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store