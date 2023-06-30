import { createFeature, createReducer, on } from "@ngrx/store";
import {
    getApiEnvironments,
    getApiEnvironmentsFailure,
    getApiEnvironmentsSuccess,
    setApiEnv,
    toggleTheme,
} from "./actions";
import { AppState, initialState } from "./state";

export const appReducer = createReducer(
    initialState,

    on(toggleTheme, (state: AppState) => ({
        ...state,
        darkTheme: !state.darkTheme,
    })),

    /// API ENVIRONMENTS

    on(getApiEnvironments, (state) => ({
        ...state,
        environmentState: {
            ...state.environmentState,
            loading: true,
        },
    })),

    on(getApiEnvironmentsSuccess, (state, data) => ({
        ...state,
        environmentState: {
            ...state.environmentState,
            loading: false,
            environmentList: data.environments,
        },
    })),

    on(getApiEnvironmentsFailure, (state, data) => ({
        ...state,
        environmentState: {
            ...state.environmentState,
            loading: false,
            environmentList: [],
        },
    })),

    on(setApiEnv, (state, data) => ({
        ...state,
        environmentState: {
            ...state.environmentState,
            currentAPIEnvironment: data.environment,
        },
    })),

)

export const appFeature = createFeature({
    name: "APP_FEATURE",
    reducer: appReducer
})
