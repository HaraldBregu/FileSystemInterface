import { createAction, props } from "@ngrx/store"
import { PartnerRoleOperation } from "src/app/shared/interfaces/partner-role-operation"

enum Action {
    GET_PARTNER_ROLE_OPERATIONS = '[PARTNERROLEOPERATIONS][GET]',
    GET_PARTNER_ROLE_OPERATIONS_SUCCESS = '[PARTNERROLEOPERATIONS][GET] success',
    GET_PARTNER_ROLE_OPERATIONS_FAILURE = '[PARTNERROLEOPERATIONS][GET] failure',

    GET_PARTNER_ROLE_OPERATIONS_BYID = '[PARTNERROLEOPERATIONSBYID][GET]',
    GET_PARTNER_ROLE_OPERATIONS_BYID_SUCCESS = '[PARTNERROLEOPERATIONSBYID][GET] success',
    GET_PARTNER_ROLE_OPERATIONS_BYID_FAILURE = '[PARTNERROLEOPERATIONSBYID][GET] failure',

    SAVE_PARTNER_ROLE_OPERATION = '[PARTNERROLEOPERATION][POST]',
    SAVE_PARTNER_ROLE_OPERATION_SUCCESS = '[PARTNERROLEOPERATION][POST] success',
    SAVE_PARTNER_ROLE_OPERATION_FAILURE = '[PARTNERROLEOPERATION][POST] failure',

    DELETE_PARTNER_ROLE_OPERATION_BYID = '[PARTNERROLEOPERATIONSBYID][DELETE]',
    DELETE_PARTNER_ROLE_OPERATION_BYID_SUCCESS = '[PARTNERROLEOPERATIONSBYID][DELETE] success',
    DELETE_PARTNER_ROLE_OPERATION_BYID_FAILURE = '[PARTNERROLEOPERATIONSBYID][DELETE] failure',

}

export const getPartnerRoleOperations = createAction(Action.GET_PARTNER_ROLE_OPERATIONS)
export const getPartnerRoleOperationsSuccess = createAction(Action.GET_PARTNER_ROLE_OPERATIONS_SUCCESS, props<{ roleOperations: PartnerRoleOperation[] }>())
export const getPartnerRoleOperationsFailure = createAction(Action.GET_PARTNER_ROLE_OPERATIONS_FAILURE)

export const getPartnerRoleOperationsById = createAction(Action.GET_PARTNER_ROLE_OPERATIONS_BYID, props<{ id: string }>())
export const getPartnerRoleOperationsByIdSuccess = createAction(Action.GET_PARTNER_ROLE_OPERATIONS_BYID_SUCCESS, props<{ roleOperation: PartnerRoleOperation }>())
export const getPartnerRoleOperationsByIdFailure = createAction(Action.GET_PARTNER_ROLE_OPERATIONS_BYID_FAILURE)

export const savePartnerRoleOperation = createAction(Action.SAVE_PARTNER_ROLE_OPERATION, props<{ roleOperation: PartnerRoleOperation }>())
export const savePartnerRoleOperationSuccess = createAction(Action.SAVE_PARTNER_ROLE_OPERATION_SUCCESS)
export const savePartnerRoleOperationFailure = createAction(Action.SAVE_PARTNER_ROLE_OPERATION_FAILURE)

export const deletePartnerRoleOperationById = createAction(Action.DELETE_PARTNER_ROLE_OPERATION_BYID, props<{ id: string }>())
export const deletePartnerRoleOperationByIdSuccess = createAction(Action.DELETE_PARTNER_ROLE_OPERATION_BYID_SUCCESS)
export const deletePartnerRoleOperationByIdFailure = createAction(Action.DELETE_PARTNER_ROLE_OPERATION_BYID_FAILURE)

