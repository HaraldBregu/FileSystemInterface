import { createAction, props } from "@ngrx/store"
import { PartnerRole } from "src/app/shared/interfaces/partner-role"

enum Action {
    GET_SEARCH_ROLES = '[SEARCHROLES][GET]',
    GET_PARTNER_ROLES = '[PARTNERROLES][GET]',
    GET_ROLES_SUCCESS = '[ROLES][GET] success',
    GET_ROLES_FAILURE = '[ROLES][GET] failure',

    GET_ROLE_REGISTRY = '[ROLEREGISTRY][GET]',
    GET_ROLE_REGISTRY_SUCCESS = '[ROLEREGISTRY][GET] success',
    GET_ROLE_REGISTRY_FAILURE = '[ROLEREGISTRY][GET] failure',

    GET_ROLE_REGISTRY_BYID = '[ROLEREGISTRYBYID][GET]',
    GET_ROLE_REGISTRY_BYID_SUCCESS = '[ROLEREGISTRYBYID][GET] success',
    GET_ROLE_REGISTRY_BYID_FAILURE = '[ROLEREGISTRYBYID][GET] failure',

    DELETE_ROLE_REGISTRY_BYID = '[ROLEREGISTRYBYID][DELETE]',
    DELETE_ROLE_REGISTRY_BYID_SUCCESS = '[ROLEREGISTRYBYID][DELETE] success',
    DELETE_ROLE_REGISTRY_BYID_FAILURE = '[ROLEREGISTRYBYID][DELETE] failure',

    SAVE_ROLE_REGISTRY = '[ROLEREGISTRY][CREATE]',
    SAVE_ROLE_REGISTRY_SUCCESS = '[ROLEREGISTRY][CREATE] success',
    SAVE_ROLE_REGISTRY_FAILURE = '[ROLEREGISTRY][CREATE] failure',

    UPDATE_ROLE_REGISTRY = '[ROLEREGISTRY][UPDATE]',
    UPDATE_ROLE_REGISTRY_SUCCESS = '[ROLEREGISTRY][UPDATE] success',
    UPDATE_ROLE_REGISTRY_FAILURE = '[ROLEREGISTRY][UPDATE] failure',

}

export const getSearchRoles = createAction(Action.GET_SEARCH_ROLES)
export const getPartnerRoles = createAction(Action.GET_PARTNER_ROLES)
export const getRolesSuccess = createAction(Action.GET_ROLES_SUCCESS, props<{ roles: PartnerRole[] }>())
export const getRolesFailure = createAction(Action.GET_ROLES_FAILURE)

export const getRoleRegistry = createAction(Action.GET_ROLE_REGISTRY)
export const getRoleRegistrySuccess = createAction(Action.GET_ROLE_REGISTRY_SUCCESS, props<{ roles: PartnerRole[] }>())
export const getRoleRegistryFailure = createAction(Action.GET_ROLE_REGISTRY_FAILURE)

export const getRoleRegistryById = createAction(Action.GET_ROLE_REGISTRY_BYID, props<{ roleId: string }>())
export const getRoleRegistryByIdSuccess = createAction(Action.GET_ROLE_REGISTRY_BYID_SUCCESS, props<{ role: PartnerRole }>())
export const getRoleRegistryByIdFailure = createAction(Action.GET_ROLE_REGISTRY_BYID_FAILURE)

export const deleteRoleRegistryById = createAction(Action.DELETE_ROLE_REGISTRY_BYID, props<{ roleId: string }>())
export const deleteRoleRegistryByIdSuccess = createAction(Action.DELETE_ROLE_REGISTRY_BYID_SUCCESS)
export const deleteRoleRegistryByIdFailure = createAction(Action.DELETE_ROLE_REGISTRY_BYID_FAILURE)

export const saveRoleRegistry = createAction(Action.SAVE_ROLE_REGISTRY, props<{ role: PartnerRole }>())
export const saveRoleRegistrySuccess = createAction(Action.SAVE_ROLE_REGISTRY_SUCCESS)
export const saveRoleRegistryFailure = createAction(Action.SAVE_ROLE_REGISTRY_FAILURE)

export const updateRoleRegistry = createAction(Action.UPDATE_ROLE_REGISTRY, props<{ role: PartnerRole }>())
export const updateRoleRegistrySuccess = createAction(Action.UPDATE_ROLE_REGISTRY_SUCCESS)
export const updateRoleRegistryFailure = createAction(Action.UPDATE_ROLE_REGISTRY_FAILURE)
