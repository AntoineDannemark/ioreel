import { CREATE, CREATE_SUCCESS, CREATE_ERROR } from '../types';

export default (person) => {
    return async(dispatch) => {
        dispatch({ type: CREATE });
        try {
            const result = await window.api.createPerson(person)

            return dispatch({
                type: CREATE_SUCCESS, 
                payload: {
                    ...person,
                    id: result.raw
                }
            });
        } catch (err) {
            return dispatch({
                type: CREATE_ERROR, 
                payload: err
            });
        }
    }
}
