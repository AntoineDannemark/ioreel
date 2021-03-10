import { 
    createSlice, 
    createAsyncThunk,
    PayloadAction
} from '@reduxjs/toolkit';
import { isPlatform } from '@ionic/react';
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

export interface Credentials {
    email: string;
    password: string;
}

export type User = {
    username: string;
    email: string;
}

interface UserState {
    username: string | undefined;
    email: string | undefined;
    loginStatus: typeof IDLE | typeof PENDING;
    loginError: string | null,
    endpoint: Endpoint | undefined;
    setEndpointStatus: typeof IDLE | typeof PENDING;
    setEndpointError: string | null;

    // signupStatus: typeof IDLE | typeof PENDING;
    // signupError: string | null;
}

const initialState: UserState = {
    username: undefined,
    email: undefined,
    loginStatus: IDLE,
    loginError: null,
    endpoint: undefined,
    setEndpointStatus: IDLE,
    setEndpointError: null,
}

// export const signup = createAsyncThunk(
//     'users/signup',

// )

export const setEndpoint = createAsyncThunk(
    'user/setEndpoint',
    async (endpoint: Endpoint) => {
        await window.api.utils.setEndpoint(endpoint, isPlatform("electron"));
        return endpoint;
    }
)

export const login = createAsyncThunk(
    'user/login',
    async(credentials: Credentials) => {
        // return await window.api.user.login(credentials)
        return {
            username: 'toto',
            email: credentials.email,
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.loginError = null;
                state.loginStatus = PENDING;
            })
            .addCase(login.fulfilled, (state, { payload }: PayloadAction<User>) => {
                state.username = payload.username;
                state.email = payload.email;
                state.loginStatus = IDLE;
            })
            .addCase(login.rejected, (state, { error }) => {
                state.loginError = error.toString();
                state.loginStatus = IDLE;
            })
            .addCase(setEndpoint.pending, state => {
                state.setEndpointError = null;
                state.setEndpointStatus = PENDING;
            })
            .addCase(setEndpoint.fulfilled, (state, { payload }: PayloadAction<Endpoint>) => {
                state.endpoint = payload;
                state.setEndpointStatus = IDLE;
            })
            .addCase(setEndpoint.rejected, (state, { error }) => {
                state.setEndpointError = error.toString();
                state.setEndpointStatus = IDLE;
            })
    },
})