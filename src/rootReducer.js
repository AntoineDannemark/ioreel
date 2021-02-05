import { combineReducers } from 'redux'
import tenantsReducer from './Features/tenants/tenantsSlice'

export default combineReducers({
    tenants: tenantsReducer
})