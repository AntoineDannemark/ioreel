import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPerson, Person } from '../../api/person';
import { ASYNC_ACTIONS_STATUS } from '../../core/constants';

const { IDLE, PENDING } = ASYNC_ACTIONS_STATUS;

interface PeopleState {
    list: IPerson[],
    fetchStatus: typeof IDLE | typeof PENDING;
    fetchError: string | null;
    addStatus: typeof IDLE | typeof PENDING;
    addError: string | null;
    updateStatus: typeof IDLE | typeof PENDING;
    updateError: string | null;
    deleteStatus: typeof IDLE | typeof PENDING;
    deleteError: string | null;
};

const initialState: PeopleState = {
    list: [],
    fetchStatus: IDLE,
    fetchError: null,
    addStatus: IDLE,
    addError: null,
    updateStatus: IDLE,
    updateError: null,
    deleteStatus: IDLE,
    deleteError: null,
};

export const fetchPeople = createAsyncThunk(
    'people/fetch',
    async () => {
        return await window.api.person.fetchAll();
    }
);

export const createPerson = createAsyncThunk(
    'people/create',
    async (person: IPerson) => {
        const id = await window.api.person.create(person);

        return {
            id,
            ...person,
        }
    }
);

export const updatePerson = createAsyncThunk(
    'people/update',
    async (person: IPerson) => {
        const { id, ...rest } = person
        // await window.api.person.update(id!, rest)
        return person
    }
)

export const deletePerson = createAsyncThunk(
    'people/delete',
    async (id: number) => {
        await window.api.person.softDelete(id)
        return id
    }
)

export const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchPeople.pending, (state) => {
                state.fetchStatus = PENDING
                state.fetchError = null
            })
            .addCase(fetchPeople.fulfilled, (state, { payload }: PayloadAction<any>) => {
                state.list = payload
                state.fetchStatus = IDLE
            })
            .addCase(fetchPeople.rejected, (state, { error }) => {
                state.fetchError = error.toString()
                state.fetchStatus = IDLE
            })
            .addCase(createPerson.pending, (state) => {
                state.addStatus = PENDING
                state.addError = null
            })
            .addCase(
                createPerson.fulfilled, 
                (state, { payload }: PayloadAction<any>) => {
                    state.list.push(payload)
                    state.addStatus = IDLE
                }
            )
            .addCase(createPerson.rejected, (state, { error }) => {
                state.addError = error.toString()
                state.addStatus = IDLE
            })
        //     .addCase(updatePerson.pending, (state) => {
        //         state.updateStatus = PENDING
        //         state.updateError = null
        //     })
        //     .addCase(updatePerson.fulfilled, (state, { payload }: PayloadAction<Person>) => {
        //         state.list = state.list.map(t => t.id === payload.id ? payload : t)
        //         state.updateStatus = IDLE
        //     })
        //     .addCase(updatePerson.rejected, (state, { error }) => {
        //         state.updateError = error.toString()
        //         state.updateStatus = IDLE
        //     })
        //     .addCase(deletePerson.pending, (state) => {
        //         state.deleteStatus = PENDING
        //         state.deleteError = null
        //     })
        //     .addCase(deletePerson.fulfilled, (state, { payload }: PayloadAction<any>) => {
        //         state.list = state.list.filter(t => t.id !== payload)
        //         state.deleteStatus = IDLE
        //     })
        //     .addCase(deletePerson.rejected, (state, { error }) => {
        //         state.deleteError = error.toString()
        //         state.deleteStatus = IDLE
        //     })
    }
});
