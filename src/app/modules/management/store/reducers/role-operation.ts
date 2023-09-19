import { createReducer, on } from "@ngrx/store";
import {
    partnerRoleOperationStateInitial,
} from "../states/index";
import { deletePartnerRoleOperationById, deletePartnerRoleOperationByIdFailure, deletePartnerRoleOperationByIdSuccess, getPartnerRoleOperations, getPartnerRoleOperationsById, getPartnerRoleOperationsByIdFailure, getPartnerRoleOperationsByIdSuccess, getPartnerRoleOperationsFailure, getPartnerRoleOperationsSuccess, savePartnerRoleOperation, savePartnerRoleOperationFailure, savePartnerRoleOperationSuccess } from "../actions/role-operation";

export const roleOperationReducer = createReducer(
    partnerRoleOperationStateInitial,

    on(getPartnerRoleOperations, (state) => ({
        ...state,
        loading: true,
        partnerRoleOperations: [],
    })),

    on(getPartnerRoleOperationsSuccess, (state, data) => ({
        ...state,
        loading: false,
        partnerRoleOperations: data.roleOperations,
    })),

    on(getPartnerRoleOperationsFailure, (state) => ({
        ...state,
        loading: false,
    })),

    on(getPartnerRoleOperationsById, (state) => ({
        ...state,
        loading: true,
    })),

    on(getPartnerRoleOperationsByIdSuccess, (state, data) => ({
        ...state,
        loading: false,
        selectedRoleOperation: data.roleOperation
    })),

    on(getPartnerRoleOperationsByIdFailure, (state) => ({
        ...state,
        loading: false,
        selectedRoleOperation: undefined
    })),

    on(savePartnerRoleOperation, (state) => ({
        ...state,
        loading: true,
    })),

    on(savePartnerRoleOperationSuccess, (state) => ({
        ...state,
        loading: false,
    })),

    on(savePartnerRoleOperationFailure, (state) => ({
        ...state,
        loading: false,
    })),

    on(deletePartnerRoleOperationById, (state) => ({
        ...state,
        loading: true,
    })),

    on(deletePartnerRoleOperationByIdSuccess, (state) => ({
        ...state,
        loading: false,
    })),

    on(deletePartnerRoleOperationByIdFailure, (state) => ({
        ...state,
        loading: false,
    })),


)
