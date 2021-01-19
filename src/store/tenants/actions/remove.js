import { REMOVE, REMOVE_SUCCESS, REMOVE_ERROR } from '../types';

export default (id) => {
    return async({dispatch, db}) => {
        dispatch({ type: REMOVE });
        try {
            await db.executeSql("delete from users where id = ?", [id]);

            dispatch({type: REMOVE_SUCCESS, payload: id})
        } catch(e) {
            dispatch({type: REMOVE_ERROR, payload: e})
        }
    }
}
