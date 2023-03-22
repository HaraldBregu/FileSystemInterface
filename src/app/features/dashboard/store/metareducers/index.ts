import { ActionReducer, INIT, MetaReducer, UPDATE } from "@ngrx/store";
import { DashboardModel } from "../models";

export const hydrationMetaReducer = (reducer: ActionReducer<DashboardModel>): ActionReducer<DashboardModel> => {
    return (state, action) => {
        if (action.type === INIT || action.type === UPDATE) {
            const storageValue = localStorage.getItem("__dashboard_state_storage__");
            if (storageValue) {
                try {
                    return JSON.parse(storageValue);
                } catch {
                    localStorage.removeItem("__dashboard_state_storage__");
                }
            }
        }
        const nextState = reducer(state, action);
        localStorage.setItem("__dashboard_state_storage__", JSON.stringify(nextState));
        return nextState;
    };
};

/*
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}

export function cache(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
        const newState = reducer(state, action);
        localStorage.setItem('__dashboard_state_storage__', JSON.stringify(newState));
        return newState;
    };
}
*/
export const metaReducers: MetaReducer<any>[] = [
    hydrationMetaReducer
];
