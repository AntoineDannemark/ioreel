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
            }
            
            if (window.ipc) {
                res = await window.ipc.invoke("query", {
                    query, 
                    params: [
                        firstname,
                        lastname,
                    ],
                });
                console.log("RES : ", res)
            }

            dispatch({type: CREATE_SUCCESS, payload: {firstname, lastname, id: res.insertId}})
        } catch(e) {
            dispatch({type: CREATE_ERROR, payload: e})
        }
    }
}
