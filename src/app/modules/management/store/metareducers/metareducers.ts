import { ActionReducer, INIT, UPDATE } from "@ngrx/store";
import { ManagementState } from "../states";

export const hydrationMetaReducer = (reducer: ActionReducer<ManagementState>): ActionReducer<ManagementState> => {
    return (state, action) => {
        if (action.type === INIT || action.type === UPDATE) {

            const storageValue = localStorage.getItem("__management_state_storage__");
            if (storageValue) {
                try {
                    return JSON.parse(storageValue);
                } catch {
                    localStorage.removeItem("__management_state_storage__")
                }
            }
        }

        const nextState = reducer(state, action)

        localStorage.setItem("__management_state_storage__", JSON.stringify(nextState))

        return nextState
    }
}
