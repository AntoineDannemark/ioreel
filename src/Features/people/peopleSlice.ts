import { people } from 'ionicons/icons';
import { 
    createEntityAdapter,
    createAsyncThunk,
    createSlice,
    PayloadAction, 
} from '@reduxjs/toolkit';

import { IPerson } from '../../api/person';
import { ASYNC_ACTIONS_STATUS } from '../../core/constants';
import { RootState } from '../../app/rootReducer';

const { IDLE, PENDING } = ASYNC_ACTIONS_STATUS;

export const fetchPeople = createAsyncThunk(
    'people/fetchAll',
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
    // TODO Check @gummy if better rewrite everything or just update the modified fields
    async (personData: IPerson) => {
        const { id, ...data } = personData;

        await window.api.person.updateOne(id!, data);
    }
)

export const peopleAdapter = createEntityAdapter<IPerson>();

const initialState = peopleAdapter.getInitialState<{
    loading: typeof IDLE | typeof PENDING;
    error: null | string;
}>({
    loading: IDLE,
    error: null,
})

export const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
        clearStore: _ => initialState,
        deletePerson: peopleAdapter.removeOne,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPeople.pending, state => {
                state.loading = PENDING
            })
            .addCase(fetchPeople.fulfilled, (state, { payload }: PayloadAction<IPerson[]>) => {
                peopleAdapter.setAll(state, payload);
                state.loading = IDLE;
            })
            .addCase(fetchPeople.rejected, (state, { error }) => {
                state.error = error.message || null;
                state.loading = IDLE;
            })
            .addCase(createPerson.pending, state => {
                state.loading = PENDING
            })
            .addCase(createPerson.fulfilled, (state, action: PayloadAction<IPerson>) => {
                peopleAdapter.addOne(state, action.payload);
                state.loading = IDLE;
            })
            .addCase(createPerson.rejected, (state, { payload }: PayloadAction<any>) => {
                state.error = payload.message;
                state.loading = IDLE;
            })
            .addCase(updatePerson.fulfilled, () => {

            })
    }
});

export const { 
    deletePerson,
    clearStore: clearPeopleStore,
} = peopleSlice.actions;


export const {
    selectById: selectPeopleById,
    selectIds: selectPeopleIds,
    selectEntities: selectPeopleEntities,
    selectAll: selectAllPeople,
    selectTotal: selectTotalPeople
} = peopleAdapter.getSelectors<RootState>(state => state.people);

// TODO Probably better use distinct interfaces for redux / typeorm entities to avoid mistakes ?
// import { IPerson } from '../../api/person';



// interface PeopleState {
//     list: IPerson[],
//     fetchStatus: typeof IDLE | typeof PENDING;
//     fetchError: string | null;
//     addStatus: typeof IDLE | typeof PENDING;
//     addError: string | null;
//     updateStatus: typeof IDLE | typeof PENDING;
//     updateError: string | null;
//     deleteStatus: typeof IDLE | typeof PENDING;
//     deleteError: string | null;
// };

// const initialState: PeopleState = {
//     list: [],
//     fetchStatus: IDLE,
//     fetchError: null,
//     addStatus: IDLE,
//     addError: null,
//     updateStatus: IDLE,
//     updateError: null,
//     deleteStatus: IDLE,
//     deleteError: null,
// };

// export const fetchPeople = createAsyncThunk(
//     'people/fetch',
//     async () => {
//         return await window.api.person.fetchAll();
//     }
// );

// export const createPerson = createAsyncThunk(
//     'people/create',
//     async (person: IPerson) => {
//         const id = await window.api.person.create(person);

//         return {
//             id,
//             ...person,
//         }
//     }
// );

// export const updatePerson = createAsyncThunk(
//     'people/update',
//     async (person: IPerson) => {
//         const { id, ...rest } = person
//         // await window.api.person.update(id!, rest)
//         return person
//     }
// )

// export const deletePerson = createAsyncThunk(
//     'people/delete',
//     async (id: number) => {
//         await window.api.person.softDelete(id)
//         return id
//     }
// )

// export const peopleSlice = createSlice({
//     name: 'people',
//     initialState,
//     reducers: {
//         clearStore: _ => initialState,
//     },
//     extraReducers: builder => {
//         builder
//             .addCase(fetchPeople.pending, (state) => {
//                 state.fetchStatus = PENDING
//                 state.fetchError = null
//             })
//             .addCase(fetchPeople.fulfilled, (state, { payload }: PayloadAction<any>) => {
//                 state.list = payload
//                 state.fetchStatus = IDLE
//             })
//             .addCase(fetchPeople.rejected, (state, { error }) => {
//                 state.fetchError = error.toString()
//                 state.fetchStatus = IDLE
//             })
//             .addCase(createPerson.pending, (state) => {
//                 state.addStatus = PENDING
//                 state.addError = null
//             })
//             .addCase(
//                 createPerson.fulfilled, 
//                 (state, { payload }: PayloadAction<any>) => {
//                     state.list.push(payload)
//                     state.addStatus = IDLE
//                 }
//             )
//             .addCase(createPerson.rejected, (state, { error }) => {
//                 state.addError = error.toString()
//                 state.addStatus = IDLE
//             })
//         //     .addCase(updatePerson.pending, (state) => {
//         //         state.updateStatus = PENDING
//         //         state.updateError = null
//         //     })
//         //     .addCase(updatePerson.fulfilled, (state, { payload }: PayloadAction<Person>) => {
//         //         state.list = state.list.map(t => t.id === payload.id ? payload : t)
//         //         state.updateStatus = IDLE
//         //     })
//         //     .addCase(updatePerson.rejected, (state, { error }) => {
//         //         state.updateError = error.toString()
//         //         state.updateStatus = IDLE
//         //     })
//         //     .addCase(deletePerson.pending, (state) => {
//         //         state.deleteStatus = PENDING
//         //         state.deleteError = null
//         //     })
//         //     .addCase(deletePerson.fulfilled, (state, { payload }: PayloadAction<any>) => {
//         //         state.list = state.list.filter(t => t.id !== payload)
//         //         state.deleteStatus = IDLE
//         //     })
//         //     .addCase(deletePerson.rejected, (state, { error }) => {
//         //         state.deleteError = error.toString()
//         //         state.deleteStatus = IDLE
//         //     })
//     }
// });

// export const { 
//     clearStore: clearPeopleStore,
// } = peopleSlice.actions;