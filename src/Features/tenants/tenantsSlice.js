import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ASYNC_ACTIONS_STATUS } from '../../core/constants'

const { IDLE, PENDING } = ASYNC_ACTIONS_STATUS

export const fetchTenants = createAsyncThunk(
    'tenants/fetch',
    async () => {
        return await window.api.fetchTenants();
    }
)

export const createTenant = createAsyncThunk(
    'tenants/create',
    async (tenant) => {
        const { raw } = await window.api.createTenant(tenant)
        return {
            id: raw,
            ...tenant
        }
    }
)

export const updateTenant = createAsyncThunk(
    'tenants/update',
    async ({id, ...tenant}) => {
        await window.api.updateTenant(id, tenant)
        return {
            id,
            ...tenant
        }
    }
)

export const deleteTenant = createAsyncThunk(
    'tenants/delete',
    async (id) => {
        const response = await window.api.removeTenant(id)
        console.log(response)
        return id
    }
)

const tenantsSlice = createSlice({
    name: 'tenants',
    initialState: {
        list: [],
        fetchStatus: null,
        fetchError: null,
        addStatus: null,
        addError: null,
        updateStatus: null,
        updateError: null,
        deleteStatus: null,
        deleteError: null,
    },
    extraReducers: {
        [fetchTenants.pending]: (state) => {
            state.fetchStatus = PENDING
            state.fetchError = null
        },
        [fetchTenants.fulfilled]: (state, { payload }) => {
            state.list = payload
            state.fetchStatus = IDLE
        },
        [fetchTenants.rejected]: (state, { error }) => {
            state.fetchError = error
            state.fetchStatus = IDLE
        },
        [createTenant.pending]: (state) => {
            state.addStatus = PENDING
            state.addError = null
        },
        [createTenant.fulfilled]: (state, { payload }) => {
            state.list.push(payload)
            state.addStatus = IDLE
        },
        [createTenant.rejected]: (state, { error }) => {
            state.addError = error
            state.addStatus = IDLE
        },
        [updateTenant.pending]: (state) => {
            state.updateStatus = PENDING
            state.updateError = null
        },
        [updateTenant.fulfilled]: (state, { payload }) => {
            state.list = state.list.map(t => t.id === payload.id ? payload : t)
            state.updateStatus = IDLE
        },
        [updateTenant.rejected]: (state, { error }) => {
            state.updateError = error
            state.updateStatus = IDLE
        },
        [deleteTenant.pending]: (state) => {
            state.deleteStatus = PENDING
            state.deleteError = null
        },
        [deleteTenant.fulfilled]: (state, { payload }) => {
            state.list = state.list.filter(t => t.id !== payload)
            state.deleteStatus = IDLE
        },
        [deleteTenant.rejected]: (state, { error }) => {
            state.deleteError = error
            state.deleteStatus = IDLE
        },
    }   
})

export default tenantsSlice.reducer