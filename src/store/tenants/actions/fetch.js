import { FETCH, FETCH_SUCCESS, FETCH_ERROR } from '../types';
import { runQuery } from '../../../utils/db';

export default () => {
    return async(dispatch) => {
        dispatch({ type: FETCH });
        
        const query = "select * from users";
        const result = await runQuery(query, [], "all")

        if (result.error) {
            return dispatch({type: FETCH_ERROR, payload: result.error})
        } else {
            return dispatch({type: FETCH_SUCCESS, payload: result.data})
        }
    }
}
