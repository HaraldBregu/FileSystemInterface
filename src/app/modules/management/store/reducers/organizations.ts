import { createReducer, on } from "@ngrx/store";
import {
    organizationStateInitial,
} from "../states/index";
import {
    addOrganisationIds,
    addOrganisationIdsFailure,
    addOrganisationIdsSuccess,
    deleteOrganisationIds,
    deleteOrganisationIdsFailure,
    deleteOrganisationIdsSuccess,
    getAllOrganizations,
    getAllOrganizationsByPartnerId,
    getAllOrganizationsFailure,
    getAllOrganizationsSuccess,
    getAssociatedOrganizations,
    getAssociatedOrganizationsFailure,
    getAssociatedOrganizationsSuccess
} from "../actions";

export const organizationReducer = createReducer(
    organizationStateInitial,

    on(getAssociatedOrganizations, (state) => {
        return {
            ...state,
            loading: true,
            associatedOrganizations: [],
        }
    }),

    on(getAssociatedOrganizationsSuccess, (state, data) => {
        return {
            ...state,
            loading: false,
            associatedOrganizations: data.organizations,
        }
    }),

    on(getAssociatedOrganizationsFailure, (state) => {
        return {
            ...state,
            loading: false,
            associatedOrganizations: [],
        }
    }),

    on(getAllOrganizationsByPartnerId, (state) => {
        return {
            ...state,
            loading: true,
            allOrganizations: [],
        }
    }),

    on(getAllOrganizations, (state) => {
        return {
            ...state,
            loading: true,
            allOrganizations: [],
        }
    }),

    on(getAllOrganizationsSuccess, (state, data) => {
        return {
            ...state,
            loading: false,
            allOrganizations: data.organizations,
        }
    }),

    on(getAllOrganizationsFailure, (state) => {
        return {
            ...state,
            loading: false,
            allOrganizations: [],
        }
    }),

    on(deleteOrganisationIds, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),

    on(deleteOrganisationIdsSuccess, (state) => {
        debugger
        return {
            ...state,
            loading: false,
        }
    }),

    on(deleteOrganisationIdsFailure, (state) => {
        return {
            ...state,
            loading: false,
        }
    }),

    on(addOrganisationIds, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),

    on(addOrganisationIdsSuccess, (state) => {
        return {
            ...state,
            loading: false,
        }
    }),

    on(addOrganisationIdsFailure, (state) => {
        return {
            ...state,
            loading: false,
        }
    }),
    
)
