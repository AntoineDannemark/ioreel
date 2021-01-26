import { REMOVE, REMOVE_SUCCESS, REMOVE_ERROR } from '../types';
import { runQuery } from '../../../core/utils/db';

export default (id) => {
    return async(dispatch) => {
        dispatch({ type: REMOVE });
        const query = "delete from users where id = ?";
        const params = [id];
        const result = await runQuery(query, params, "run");

        if (result.error) {
            return dispatch({type: REMOVE_ERROR, payload: result.error})
        } else  {
            return dispatch({
                type: REMOVE_SUCCESS, 
                payload: id,
            });
        }
    }
}
