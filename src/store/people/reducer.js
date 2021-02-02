import * as TYPES from './types';
import { initialState } from './index';

export default (state = initialState, action) => {
    switch(action.type) {
        case TYPES.FETCH:
            return {
                ...state,
                fetchPending: true,
                fetchError: null,
            } 
        case TYPES.FETCH_ERROR:
            return {
                ...state,
                fetchPending: false,
                fetchError: action.payload,
            } 
        case TYPES.FETCH_SUCCESS:
            return {
                ...state,
                fetchPending: false,
                people: action.payload,
            }
        case TYPES.CREATE:
            return {
                ...state,
                createPending: true,
                createError: null,
            } 
        case TYPES.CREATE_ERROR:
            return {
                ...state,
                createPending: false,
                createError: action.payload,
            } 
        case TYPES.CREATE_SUCCESS:
            return {
                ...state,
                createPending: false,
                people: [
                    ...state.people,
                    action.payload,
                ]
            }
        case TYPES.UPDATE:
            return {
                ...state,
                updatePending: true,
                updateError: null,
            } 
        case TYPES.UPDATE_ERROR:
            return {
                ...state,
                updatePending: false,
                updateError: action.payload,
            } 
        case TYPES.UPDATE_SUCCESS:
            return {
                ...state,
                updatePending: false,
                people: state.people.map(
                    p => p.id === action.payload.id 
                        ? {
                            ...p,
                            firstname: action.payload.firstname, 
                            lastname: action.payload.lastname
                        } : p
                )
            }
        case TYPES.REMOVE:
            return {
                ...state,
                removePending: true,
                removeError: null,
            } 
        case TYPES.REMOVE_ERROR:
            return {
                ...state,
                removePending: false,
                removeError: action.payload,
            } 
        case TYPES.REMOVE_SUCCESS:
            return {
                ...state,
                removePending: false,
                people: state.people.filter(p => p.id !== action.payload)
            }
        default: 
            return state;
    }
}