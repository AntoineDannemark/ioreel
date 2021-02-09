import { combineReducers } from 'redux'

import tenantsReducer from '../Features/tenants/tenantsSlice'

const rootReducer = combineReducers({
    tenants: tenantsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer