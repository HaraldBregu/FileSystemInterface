import { createReducer, on } from "@ngrx/store";
import {
    partnerRoleStateInitial,
} from "../states/index";
import { deleteRoleRegistryById, deleteRoleRegistryByIdFailure, deleteRoleRegistryByIdSuccess, getPartnerRoles, getRoleRegistry, getRoleRegistryById, getRoleRegistryByIdFailure, getRoleRegistryByIdSuccess, getRoleRegistryFailure, getRoleRegistrySuccess, getRolesFailure, getRolesSuccess, getSearchRoles, saveRoleRegistry, saveRoleRegistryFailure, saveRoleRegistrySuccess, updateRoleRegistry, updateRoleRegistryFailure, updateRoleRegistrySuccess } from "../actions";

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

    on(getRoleRegistry, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),

    on(getRoleRegistrySuccess, (state, data) => {
        return {
            ...state,
            loading: false,
            partnerRoles: data.roles
        }
    }),

    on(getRoleRegistryFailure, (state) => {
        return {
            ...state,
            loading: false,
        }
    }),

    on(getRoleRegistryById, (state) => {
        return {
            ...state,
            loading: true,
            selectedRole: undefined,
        }
    }),

    on(getRoleRegistryByIdSuccess, (state, data) => {
        return {
            ...state,
            loading: false,
            selectedRole: data.role,
        }
    }),

    on(getRoleRegistryByIdFailure, (state) => {
        return {
            ...state,
            loading: false,
            selectedRole: undefined,
        }
    }),

    on(updateRoleRegistry, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),

    on(updateRoleRegistrySuccess, (state, data) => {
        return {
            ...state,
            loading: false,
        }
    }),

    on(updateRoleRegistryFailure, (state) => {
        return {
            ...state,
            loading: false,
        }
    }),

    on(saveRoleRegistry, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),

    on(saveRoleRegistrySuccess, (state) => {
        return {
            ...state,
            loading: false,
        }
    }),

    on(saveRoleRegistryFailure, (state) => {
        return {
            ...state,
            loading: false,
        }
    }),

    on(deleteRoleRegistryById, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),

    on(deleteRoleRegistryByIdSuccess, (state) => {
        return {
            ...state,
            loading: false,
        }
    }),
    
    on(deleteRoleRegistryByIdFailure, (state) => {
        return {
            ...state,
            loading: false,
        }
    }),
)
