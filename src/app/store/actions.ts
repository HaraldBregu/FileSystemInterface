import { createAction, props } from "@ngrx/store";

export enum ActionTypes {
    TOGGLE_THEME = '[TOGGLETHEME][SET]',
    SET_API_ENV = '[SET_API_ENV][SET]',

    GET_API_ENVIRONMENTS = '[API_ENVIRONMENTS][GET]',
    GET_API_ENVIRONMENTS_SUCCESS = '[API_ENVIRONMENTS][GET] success',
    GET_API_ENVIRONMENTS_FAILURE = '[API_ENVIRONMENTS][GET] failure',
}

export const toggleTheme = createAction(ActionTypes.TOGGLE_THEME)
export const setApiEnv = createAction(ActionTypes.SET_API_ENV, props<{ environment: string }>())

/// GET API ENVIRONMENTS

export const getApiEnvironments = createAction(ActionTypes.GET_API_ENVIRONMENTS);
export const getApiEnvironmentsSuccess = createAction(
    ActionTypes.GET_API_ENVIRONMENTS_SUCCESS,
    props<{ environments: string[] }>());
export const getApiEnvironmentsFailure = createAction(
    ActionTypes.GET_API_ENVIRONMENTS_FAILURE,
    props<{ error: any }>());