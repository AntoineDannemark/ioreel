import { isPlatform } from '@ionic/react';
import { 
    createSlice, 
    createAsyncThunk,
    PayloadAction
} from '@reduxjs/toolkit';
import { 
    ASYNC_ACTIONS_STATUS, 
} from '../../core/constants';
import type { Endpoint } from '../../storage/types';
const { IDLE, PENDING } = ASYNC_ACTIONS_STATUS;

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
    isAuthenticated: boolean;
    endpoint: Endpoint | undefined;
    setEndpointStatus: typeof IDLE | typeof PENDING;
    setEndpointError: string | null;
    clearEndpointStatus: typeof IDLE | typeof PENDING;
    clearEndpointError: string | null;
    // signupStatus: typeof IDLE | typeof PENDING;
    // signupError: string | null;
}

const initialState: UserState = {
    username: undefined,
    email: undefined,
    loginStatus: IDLE,
    loginError: null,
    isAuthenticated: false,
    endpoint: undefined,
    setEndpointStatus: IDLE,
    setEndpointError: null,
    clearEndpointStatus: IDLE,
    clearEndpointError: null,
}

// export const signup = createAsyncThunk(
//     'users/signup',

// )

export const setEndpoint = createAsyncThunk(
    'user/setEndpoint',
    async ({endpoint, shouldSetInStorage = true}: {endpoint: Endpoint, shouldSetInStorage: boolean}) => {
        if (!endpoint) return;
        shouldSetInStorage && await window.storageApi.setEndpoint(endpoint, isPlatform("electron"));        
        return endpoint;
    }
)

export const clearEndpoint = createAsyncThunk(
    'user/clearEndpoint',
    async() => {
        return await window.storageApi.clearEndpoint(isPlatform("electron"));
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
                state.isAuthenticated = true;
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
            .addCase(clearEndpoint.pending, state => {
                state.clearEndpointError = null;
                state.clearEndpointStatus = PENDING;
            })
            .addCase(clearEndpoint.fulfilled, (state, { payload }: PayloadAction<boolean>) => {
                state.endpoint = payload === true ? undefined : state.endpoint;
                state.clearEndpointStatus = IDLE;
            })
            .addCase(clearEndpoint.rejected, (state, { error }) => {
                state.clearEndpointError = error.toString();
                state.clearEndpointStatus = IDLE;
            })
    },
})