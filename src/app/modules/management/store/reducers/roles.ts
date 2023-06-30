import { createReducer, on } from "@ngrx/store";
import {
    partnerRoleStateInitial,
} from "../states/index";
import { getPartnerRoles, getRolesFailure, getRolesSuccess, getSearchRoles } from "../actions";

export const partnerRoleReducer = createReducer(
    partnerRoleStateInitial,

    on(getPartnerRoles, (state) => {
        return {
            ...state,
            partnerRoles: [],
        }
    }),

    on(getSearchRoles, (state) => {
        return {
            ...state,
            partnerRoles: [],
        }
    }),

    on(getRolesSuccess, (state, data) => {
        return {
            ...state,
            partnerRoles: data.roles
        }
    }),

    on(getRolesFailure, (state) => {
        return {
            ...state,
        }
    }),

)
