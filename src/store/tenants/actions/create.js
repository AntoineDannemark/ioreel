import { CREATE, CREATE_SUCCESS, CREATE_ERROR } from '../types';
import { runQuery } from '../../../core/utils/db';

// smelly code
const noDataNorId = data => !data || !(data.insertId || data.lastID);
const getSQLiteDataId = data => {
    if (noDataNorId(data)) {
        return null;  
    } else if (data.lastID) {
        return data.lastID;
    } else {
        return data.insertId
    }
}

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
                    id: getSQLiteDataId(result.data)
                }
            });
        }
    }
}
