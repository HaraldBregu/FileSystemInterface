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
