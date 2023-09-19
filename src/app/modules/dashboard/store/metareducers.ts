import { ActionReducer, INIT, UPDATE } from "@ngrx/store";
import { DashboardState } from "./states/state";

export const hydrationMetaReducer = (reducer: ActionReducer<DashboardState>): ActionReducer<DashboardState> => {
    return (state, action) => {
        if (action.type === INIT || action.type === UPDATE) {

            const storageValue = localStorage.getItem("__dashboard_state_storage__");
            if (storageValue) {
                try {
                    return JSON.parse(storageValue);
                } catch {
                    localStorage.removeItem("__dashboard_state_storage__")
                }
            }
        }

        const nextState = reducer(state, action)

        localStorage.setItem("__dashboard_state_storage__", JSON.stringify(nextState))

        return nextState
    }
}
