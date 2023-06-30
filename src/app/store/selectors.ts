import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./state";
import { appFeature } from "./reducers";


export const APP_SELECTOR = "APP_SELECTOR_ID"

const {
    selectDarkTheme,
    selectEnvironmentState,
} = appFeature



//const appState = createFeatureSelector<AppState>(APP_SELECTOR)

//export const selectAppState = createSelector(appState, (state) => state)

export const isDarkTheme = createSelector(selectDarkTheme, (state) => state)
export const currentAPIEnvironment = createSelector(selectEnvironmentState, (state) => (state.currentAPIEnvironment))
export const getEnvironmentList = createSelector(selectEnvironmentState, (state) => (state.environmentList))
export const getEnvironmentsLoading = createSelector(selectEnvironmentState, (state) => (state.loading))