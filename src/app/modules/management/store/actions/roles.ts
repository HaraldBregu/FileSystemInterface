import { createAction, props } from "@ngrx/store"
import { PartnerRole } from "src/app/shared/interfaces/partner-role"

enum Action {
    GET_SEARCH_ROLES = '[SEARCHROLES][GET]',
    GET_PARTNER_ROLES = '[PARTNERROLES][GET]',
    GET_ROLES_SUCCESS = '[ROLES][GET] success',
    GET_ROLES_FAILURE = '[ROLES][GET] failure',
}

export const getSearchRoles = createAction(Action.GET_SEARCH_ROLES)
export const getPartnerRoles = createAction(Action.GET_PARTNER_ROLES)
export const getRolesSuccess = createAction(Action.GET_ROLES_SUCCESS, props<{ roles: PartnerRole[] }>())
export const getRolesFailure = createAction(Action.GET_ROLES_FAILURE)