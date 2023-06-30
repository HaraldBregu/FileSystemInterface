import { ActionReducer, INIT, UPDATE } from "@ngrx/store";
import { AppState } from "./state";

export const hydrationMetaReducer = (reducer: ActionReducer<AppState>): ActionReducer<AppState> => {
    return (state, action) => {
        if (action.type === INIT || action.type === UPDATE) {

            const storageValue = localStorage.getItem("__app_state_storage__");
            if (storageValue) {
                try {
                    return JSON.parse(storageValue);
                } catch {
                    localStorage.removeItem("__app_state_storage__")
                }
            }
        }

        const nextState = reducer(state, action)

        localStorage.setItem("__app_state_storage__", JSON.stringify(nextState))

        return nextState
    }
}
