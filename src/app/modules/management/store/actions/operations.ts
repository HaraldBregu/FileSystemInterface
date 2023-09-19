import { createAction, props } from "@ngrx/store"
import { PartnerOperation } from "src/app/shared/interfaces/partner-operation"

enum Action {
    GET_PARTNER_OPERATIONS = '[PARTNEROPERATIONS][GET]',
    GET_PARTNER_OPERATIONS_SUCCESS = '[PARTNEROPERATIONS][GET] success',
    GET_PARTNER_OPERATIONS_FAILURE = '[PARTNEROPERATIONS][GET] failure',

    GET_PARTNER_OPERATION_BY_ID = '[PARTNEROPERATIONSID][GET]',
    GET_PARTNER_OPERATION_BY_ID_SUCCESS = '[PARTNEROPERATIONSID][GET] success',
    GET_PARTNER_OPERATION_BY_ID_FAILURE = '[PARTNEROPERATIONSID][GET] failure',

    DELETE_PARTNER_OPERATION_BY_ID = '[PARTNEROPERATIONSID][DELETE]',
    DELETE_PARTNER_OPERATIONS_BY_ID_SUCCESS = '[PARTNEROPERATIONSID][DELETE] success',
    DELETE_PARTNER_OPERATIONS_BY_ID_FAILURE = '[PARTNEROPERATIONSID][DELETE] failure',

    SAVE_PARTNER_OPERATION = '[PARTNEROPERATION][SAVE]',
    SAVE_PARTNER_OPERATION_SUCCESS = '[PARTNEROPERATION][SAVE] success',
    SAVE_PARTNER_OPERATION_FAILURE = '[PARTNEROPERATION][SAVE] failure',
}

export const getPartnerOperations = createAction(Action.GET_PARTNER_OPERATIONS)
export const getPartnerOperationsSuccess = createAction(Action.GET_PARTNER_OPERATIONS_SUCCESS, props<{ operations: PartnerOperation[] }>())
export const getPartnerOperationsFailure = createAction(Action.GET_PARTNER_OPERATIONS_FAILURE)

export const getPartnerOperationById = createAction(Action.GET_PARTNER_OPERATION_BY_ID, props<{ operationId: string }>())
export const getPartnerOperationByIdSuccess = createAction(Action.GET_PARTNER_OPERATION_BY_ID_SUCCESS, props<{ operation: PartnerOperation }>())
export const getPartnerOperationByIdFailure = createAction(Action.GET_PARTNER_OPERATION_BY_ID_FAILURE)

export const deletePartnerOperationById = createAction(Action.DELETE_PARTNER_OPERATION_BY_ID, props<{ operationId: string }>())
export const deletePartnerOperationByIdSuccess = createAction(Action.DELETE_PARTNER_OPERATIONS_BY_ID_SUCCESS)
export const deletePartnerOperationByIdFailure = createAction(Action.DELETE_PARTNER_OPERATIONS_BY_ID_FAILURE)

export const savePartnerOperation = createAction(Action.SAVE_PARTNER_OPERATION, props<{ operation: PartnerOperation }>())
export const savePartnerOperationSuccess = createAction(Action.SAVE_PARTNER_OPERATION_SUCCESS)
export const savePartnerOperationFailure = createAction(Action.SAVE_PARTNER_OPERATION_FAILURE)
