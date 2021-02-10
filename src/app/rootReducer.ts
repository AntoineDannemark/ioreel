import { combineReducers } from 'redux'

import tenantsReducer from '../Features/tenants/tenantsSlice'
import peopleReducer from '../Features/people/peopleSlice'

const rootReducer = combineReducers({
    tenants: tenantsReducer,
    people: peopleReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer