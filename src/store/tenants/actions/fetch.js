import { FETCH, FETCH_SUCCESS, FETCH_ERROR } from '../types';

export default () => {
    return async(dispatch) => {
        dispatch({ type: FETCH });
        try {
            console.log('fetch')
            const res = await window.db.executeSql("select * from users", []);
            
            await console.log(res)

            let tenants = [];            
            
            if (res.rows.length > 0) {
                for (let i = 0; i < res.rows.length; i++) {
                    tenants.push({
                        id: res.rows.item(i).id,
                        firstname: res.rows.item(i).firstname,
                        lastname: res.rows.item(i).lastname,
                    });
                }                
            }
            dispatch({type: FETCH_SUCCESS, payload: tenants})
        } catch(e) {
            dispatch({type: FETCH_ERROR, payload: e})
        }
    }
}
