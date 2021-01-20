import { REMOVE, REMOVE_SUCCESS, REMOVE_ERROR } from '../types';

export default (id) => {
    return async(dispatch) => {
        dispatch({ type: REMOVE });
        try {
            await window.db.executeSql("delete from users where id = ?", [id]);

            dispatch({type: REMOVE_SUCCESS, payload: id})
        } catch(e) {
            dispatch({type: REMOVE_ERROR, payload: e})
        }
    }
}
