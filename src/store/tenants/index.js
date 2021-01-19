import fetch from './actions/fetch';
import create from './actions/create';
import update from './actions/update';
import remove from './actions/remove';

export const initialState = {
    tenants: [],
    fetchPending: false,
    fetchError: null,
    createPending: false,
    createError: null,
    updatePending: false,
    updateError: null,
    removePending: false,
    removeError: null,
}

export const actions = {
    fetch,
    create,
    update,
    remove
}
