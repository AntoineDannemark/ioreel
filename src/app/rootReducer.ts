import { combineReducers } from 'redux';

import { userSlice } from '../features/User/userSlice';
import { peopleSlice } from '../features/People/peopleSlice';

const rootReducer = combineReducers({
    user: userSlice.reducer,
    people: peopleSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer