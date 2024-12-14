import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ExampleState {
    name: string;
}

const initialState: ExampleState = {
    name: "what's your name?",
};

export const exampleSlice = createSlice({
    name: "example",
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
    },
});

export const { setName } = exampleSlice.actions;
export const exampleReducer = exampleSlice.reducer;
