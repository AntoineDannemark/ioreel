import { FETCH, FETCH_SUCCESS, FETCH_ERROR } from '../types';

export default () => {
    return async(dispatch) => {
        dispatch({ type: FETCH });        
        try {
            const result = await window.api.fetchPeople()

            return dispatch({
                type: FETCH_SUCCESS, 
                payload: result 
            });
        } catch(err) {
            return dispatch({
                type: FETCH_ERROR, 
                payload: err
            });
        }
    }
}
