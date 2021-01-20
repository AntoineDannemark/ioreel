import { CREATE, CREATE_SUCCESS, CREATE_ERROR } from '../types';

export default ({firstname, lastname}) => {
    return async(dispatch) => {
        dispatch({ type: CREATE });
        try {
            const query = "insert into users (firstname, lastname) values (?,?)";
            let res;

            if (window.db) {
                res = await window.db.executeSql(query, [
                    firstname,
                    lastname,
                ]);
            } else if (window.ipc) {
                window.ipc.send("query", query)
            }

            dispatch({type: CREATE_SUCCESS, payload: {firstname, lastname, id: res.insertId}})
        } catch(e) {
            dispatch({type: CREATE_ERROR, payload: e})
        }
    }
}
