import { UPDATE, UPDATE_SUCCESS, UPDATE_ERROR } from '../types';

export default ({firstname, lastname, editId}) => {
    return async({dispatch, db}) => {
        dispatch({ type: UPDATE });
        try {
            await db.executeSql("update users set firstname = ?, lastname = ? where id = ?",
                [firstname, lastname, editId]
            );

            dispatch({type: UPDATE_SUCCESS, payload: {firstname, lastname, id: editId}})
        } catch(e) {
            dispatch({type: UPDATE_ERROR, payload: e})
        }
    }
}
