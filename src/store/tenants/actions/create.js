import { CREATE, CREATE_SUCCESS, CREATE_ERROR } from '../types';

export default ({firstname, lastname}) => {
    return async({dispatch, db}) => {
        dispatch({ type: CREATE });
        try {
            const res = await db.executeSql("insert into users (firstname, lastname) values (?,?)", [
                firstname,
                lastname,
            ]);

            dispatch({type: CREATE_SUCCESS, payload: {firstname, lastname, id: res.insertId}})
        } catch(e) {
            dispatch({type: CREATE_ERROR, payload: e})
        }
    }
}
