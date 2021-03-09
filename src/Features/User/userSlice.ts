import { isPlatform } from '@ionic/react';
import { 
    createSlice, 
    createAsyncThunk ,
} from '@reduxjs/toolkit';
import { 
    ASYNC_ACTIONS_STATUS, 
    DB_HOSTING 
} from '../../core/constants';

const { IDLE, PENDING } = ASYNC_ACTIONS_STATUS;
const { LOCAL, SLS } = DB_HOSTING;

export type DbHosting = typeof LOCAL | typeof SLS | undefined;
export type SlsEndpoint = string | undefined;
export type Endpoint = {
    dbHosting: DbHosting;
    slsEndpoint: SlsEndpoint;
}

interface UserState {
    username: string | undefined;
    // email: string | undefined;
    endpoint: Endpoint;
    setEndpointStatus: typeof IDLE | typeof PENDING;


    // signupStatus: typeof IDLE | typeof PENDING;
    // signupError: string | null;
}

const initialState = {
    username: undefined,
    // email: undefined,
    // dbHosting: undefined,
    endpoint: undefined,
    setEndpointStatus: IDLE,
}

// export const signup = createAsyncThunk(
//     'users/signup',

// )

export const setEndpoint = createAsyncThunk(
    'users/setEndpoint',
    async (endpoint: Endpoint) => {
        return await window.api.utils.setEndpoint(endpoint, isPlatform("electron"))
    }
)


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(setEndpoint.pending), state => {
                state.setEndpointError = 
            }
    },
})