import { createFeature, createReducer, on } from "@ngrx/store";
import { initialState } from "./state";

export const mainFeature = createFeature({
    name: "MAIN_FEATURE",
    reducer: createReducer(
        initialState,
    )
})
