import { createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface TaskState {
    examples: string[];
}

const initialState: TaskState = {
    examples: [],
}

export const taskCreationSlice = createSlice({
    name: 'taskCreation',
    initialState,
    reducers: {
        setExamples: (state, action: PayloadAction<string[]>) => {
            state.examples = action.payload;
        },
    }
});


export const {
    setExamples,
} = taskCreationSlice.actions;

export const taskCreationReducer = taskCreationSlice.reducer;