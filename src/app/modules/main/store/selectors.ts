import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MainState } from "./state";
import { selectAppState } from "src/app/store/selectors";
import { mainFeature } from "./reducers";

const {
    selectTitle,
} = mainFeature


export const selectMainTitle = createSelector(
    selectTitle,
    (state) => state)

export const selectDarkMode = createSelector(
    selectAppState,
    (state) => state.darkTheme)

    /*
export const test = createSelector(
    mainFeature,
    selectAppState,
    (state, appstate) => appstate.darkTheme)
*/
