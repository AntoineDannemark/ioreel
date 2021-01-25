import { CREATE, CREATE_SUCCESS, CREATE_ERROR } from '../types';
import { runQuery } from '../../../utils/db';

export default ({firstname, lastname}) => {
    return async(dispatch) => {
        dispatch({ type: CREATE });
        
        const query = "insert into users (firstname, lastname) values (?,?)";
        const params = [firstname, lastname];
        const result = await runQuery(query, params, "run");

        if (result.error) {
            return dispatch({type: CREATE_ERROR, payload: result.error})
        } else {
            return dispatch({
                type: CREATE_SUCCESS, 
                payload: {
                    firstname, 
                    lastname, 
                    id: result.data.insertId
                }
            });
        }


    }
}
