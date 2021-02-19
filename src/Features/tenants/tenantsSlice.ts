import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Tenant } from './types'
import { ASYNC_ACTIONS_STATUS } from '../../core/constants'

const { IDLE, PENDING } = ASYNC_ACTIONS_STATUS

interface TenantsState {
    list: Tenant[],
    fetchStatus: typeof IDLE | typeof PENDING;
    fetchError: string | null;
    addStatus: typeof IDLE | typeof PENDING;
    addError: string | null;
    updateStatus: typeof IDLE | typeof PENDING;
    updateError: string | null;
    deleteStatus: typeof IDLE | typeof PENDING;
    deleteError: string | null;
}

const initialState: TenantsState = {
    list: [],
    fetchStatus: IDLE,
    fetchError: null,
    addStatus: IDLE,
    addError: null,
    updateStatus: IDLE,
    updateError: null,
    deleteStatus: IDLE,
    deleteError: null,
}

export const fetchTenants = createAsyncThunk(
    'tenants/fetch',
    async () => {
        // return await window.api.fetchTenants();
    }
)

export const createTenant = createAsyncThunk(
    'tenants/create',
    async ({firstname, lastname}: Tenant) => {
        // const { raw } = await window.api.createTenant({firstname, lastname})
        // return {
        //     id: raw,
        //     firstname, 
        //     lastname,
        // }
    }
)

export const updateTenant = createAsyncThunk(
    'tenants/update',
    async (tenant: Tenant) => {
        const { id, ...rest } = tenant
        // await window.api.updateTenant(id!, rest)
        return tenant
    }
)

export const deleteTenant = createAsyncThunk(
    'tenants/delete',
    async (id: number) => {
        // await window.api.removeTenant(id)
        return id
    }
)

const tenantsSlice = createSlice({
    name: 'tenants',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        // builder
        //     .addCase(fetchTenants.pending, (state) => {
        //         state.fetchStatus = PENDING
        //         state.fetchError = null
        //     })
        //     .addCase(fetchTenants.fulfilled, (state, { payload }: PayloadAction<Tenant[]>) => {
        //         state.list = payload
        //         state.fetchStatus = IDLE
        //     })
        //     .addCase(fetchTenants.rejected, (state, { error }) => {
        //         state.fetchError = error.toString()
        //         state.fetchStatus = IDLE
        //     })
        //     .addCase(createTenant.pending, (state) => {
        //         state.addStatus = PENDING
        //         state.addError = null
        //     })
        //     .addCase(
        //         createTenant.fulfilled, 
        //         (state, { payload }: PayloadAction<{ 
        //             id: number; 
        //             firstname: string; 
        //             lastname: string; 
        //         }>) => {
        //             state.list.push(payload)
        //             state.addStatus = IDLE
        //         }
        //     )
        //     .addCase(createTenant.rejected, (state, { error }) => {
        //         state.addError = error.toString()
        //         state.addStatus = IDLE
        //     })
        //     .addCase(updateTenant.pending, (state) => {
        //         state.updateStatus = PENDING
        //         state.updateError = null
        //     })
        //     .addCase(updateTenant.fulfilled, (state, { payload }: PayloadAction<Tenant>) => {
        //         state.list = state.list.map(t => t.id === payload.id ? payload : t)
        //         state.updateStatus = IDLE
        //     })
        //     .addCase(updateTenant.rejected, (state, { error }) => {
        //         state.updateError = error.toString()
        //         state.updateStatus = IDLE
        //     })
        //     .addCase(deleteTenant.pending, (state) => {
        //         state.deleteStatus = PENDING
        //         state.deleteError = null
        //     })
        //     .addCase(deleteTenant.fulfilled, (state, { payload }: PayloadAction<any>) => {
        //         state.list = state.list.filter(t => t.id !== payload)
        //         state.deleteStatus = IDLE
        //     })
        //     .addCase(deleteTenant.rejected, (state, { error }) => {
        //         state.deleteError = error.toString()
        //         state.deleteStatus = IDLE
        //     })
    }   
})

export default tenantsSlice.reducer

