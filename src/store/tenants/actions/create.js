import { CREATE, CREATE_SUCCESS, CREATE_ERROR } from '../types';

export default (tenant) => {
    return async(dispatch) => {
        dispatch({ type: CREATE });
        try {
            const result = await window.api.createTenant(tenant)

            return dispatch({
                type: CREATE_SUCCESS, 
                payload: {
                    ...tenant,
                    id: result.raw
                }
            });
        } catch (err) {
            return dispatch({
                type: CREATE_ERROR, 
                payload: err
            });
        }
    }
}
