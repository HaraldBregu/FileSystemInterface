import { createReducer, on } from "@ngrx/store";
import {
    operationStateInitial,
} from "../states/index";
import {
    deletePartnerOperationById,
    deletePartnerOperationByIdFailure,
    deletePartnerOperationByIdSuccess,
    getPartnerOperationById,
    getPartnerOperationByIdFailure,
    getPartnerOperationByIdSuccess,
    getPartnerOperations,
    getPartnerOperationsFailure,
    getPartnerOperationsSuccess,
    savePartnerOperation,
    savePartnerOperationFailure,
    savePartnerOperationSuccess
} from "../actions";

export const operationReducer = createReducer(
    operationStateInitial,

    on(getPartnerOperations, (state) => ({
        ...state,
        loading: true,
    })),

    on(getPartnerOperationsSuccess, (state, data) => ({
        ...state,
        loading: false,
        operations: data.operations,
    })),

    on(getPartnerOperationsFailure, (state) => ({
        ...state,
        loading: false,
    })),

    on(getPartnerOperationById, (state) => ({
        ...state,
        loading: true,
    })),

    on(getPartnerOperationByIdSuccess, (state, data) => ({
        ...state,
        loading: false,
        currentOperation: data.operation
    })),

    on(getPartnerOperationByIdFailure, (state) => ({
        ...state,
        loading: false,
    })),

    on(deletePartnerOperationById, (state) => ({
        ...state,
        loading: true,
    })),

    on(deletePartnerOperationByIdSuccess, (state) => ({
        ...state,
        loading: false,
    })),

    on(deletePartnerOperationByIdFailure, (state) => ({
        ...state,
        loading: false,
    })),

    on(savePartnerOperation, (state) => ({
        ...state,
        loading: true,
    })),

    on(savePartnerOperationSuccess, (state) => ({
        ...state,
        loading: false,
    })),

    on(savePartnerOperationFailure, (state) => ({
        ...state,
        loading: false,
    })),

)
