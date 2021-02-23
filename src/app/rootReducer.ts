import { combineReducers } from 'redux'

import peopleReducer from '../Features/people/peopleSlice'

const rootReducer = combineReducers({
    people: peopleReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer