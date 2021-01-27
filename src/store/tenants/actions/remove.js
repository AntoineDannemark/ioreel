import { REMOVE, REMOVE_SUCCESS, REMOVE_ERROR } from '../types';

export default (id) => {
    return async(dispatch) => {
        dispatch({ type: REMOVE });
        try {           
            await window.api.removeTenant(id);

            return dispatch({
                type: REMOVE_SUCCESS, 
                payload: id,
            });
        } catch(err) {
            return dispatch({
                type: REMOVE_ERROR, 
                payload: err
            });
        }
    }
}
