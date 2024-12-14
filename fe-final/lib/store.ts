import { configureStore } from "@reduxjs/toolkit";
import { exampleReducer } from "./slices/exampleSlice";

export const makeStore = () => {
    return configureStore({
        // add new reducers here (written in slice.ts files)
        reducer: {
            example: exampleReducer,
        },
    });
};

// below are just type inferences so you don't have to declare them manually everywhere

// infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
