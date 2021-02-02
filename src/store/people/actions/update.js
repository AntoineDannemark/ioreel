import { UPDATE, UPDATE_SUCCESS, UPDATE_ERROR } from '../types';

export default (id, data) => {
    return async(dispatch) => {
        dispatch({ type: UPDATE });
        try {
            await window.api.updatePerson(id, data)

            dispatch({type: UPDATE_SUCCESS, payload: { id, ...data }})
        } catch(e) {
            dispatch({type: UPDATE_ERROR, payload: e})
        }
    }
}
