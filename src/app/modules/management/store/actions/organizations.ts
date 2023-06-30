import { createAction, props } from "@ngrx/store"
import { Organization } from "src/app/shared/interfaces/organization"

enum Action {

    GET_ASSOCIATED_ORGANIZATIONS = '[ASSOCIATEDORGANIZATIONS][GET]',
    GET_ASSOCIATED_ORGANIZATIONS_SUCCESS = '[ASSOCIATEDORGANIZATIONS][GET] success',
    GET_ASSOCIATED_ORGANIZATIONS_FAILURE = '[ASSOCIATEDORGANIZATIONS][GET] failure',

    GET_ALL_ORGANIZATIONS = '[ALLORGANIZATIONS][GET]',
    GET_ALL_ORGANIZATIONS_BY_PARTNER_ID = '[ALLORGANIZATIONSBYPARTNERID][GET]',
    GET_ALL_ORGANIZATIONS_SUCCESS = '[ALLORGANIZATIONS][GET] success',
    GET_ALL_ORGANIZATIONS_FAILURE = '[ALLORGANIZATIONS][GET] failure',

    ADD_ORGANISATION_IDS = '[ADDORGANISATIONIDS][POST]',
    ADD_ORGANISATION_IDS_SUCCESS = '[ADDORGANISATIONIDS][POST] success',
    ADD_ORGANISATION_IDS_FAILURE = '[ADDORGANISATIONIDS][POST] failure',

    DELETE_ORGANISATION_IDS = '[DELETEORGANISATIONIDS][POST]',
    DELETE_ORGANISATION_IDS_SUCCESS = '[DELETEORGANISATIONIDS][POST] success',
    DELETE_ORGANISATION_IDS_FAILURE = '[DELETEORGANISATIONIDS][POST] failure',

}

export const getAssociatedOrganizations = createAction(Action.GET_ASSOCIATED_ORGANIZATIONS, props<{ partenrId: string }>())
export const getAssociatedOrganizationsSuccess = createAction(Action.GET_ASSOCIATED_ORGANIZATIONS_SUCCESS, props<{ organizations: Organization[] }>())
export const getAssociatedOrganizationsFailure = createAction(Action.GET_ASSOCIATED_ORGANIZATIONS_FAILURE)

export const getAllOrganizations = createAction(Action.GET_ALL_ORGANIZATIONS, props<{ name: string, companyName: string }>())
export const getAllOrganizationsByPartnerId = createAction(Action.GET_ALL_ORGANIZATIONS_BY_PARTNER_ID)
export const getAllOrganizationsSuccess = createAction(Action.GET_ALL_ORGANIZATIONS_SUCCESS, props<{ organizations: Organization[] }>())
export const getAllOrganizationsFailure = createAction(Action.GET_ALL_ORGANIZATIONS_FAILURE)

export const addOrganisationIds = createAction(Action.ADD_ORGANISATION_IDS, props<{ ids: string[] }>())
export const addOrganisationIdsSuccess = createAction(Action.ADD_ORGANISATION_IDS_SUCCESS)
export const addOrganisationIdsFailure = createAction(Action.ADD_ORGANISATION_IDS_FAILURE)

export const deleteOrganisationIds = createAction(Action.DELETE_ORGANISATION_IDS, props<{ ids: string[] }>())
export const deleteOrganisationIdsSuccess = createAction(Action.DELETE_ORGANISATION_IDS_SUCCESS)
export const deleteOrganisationIdsFailure = createAction(Action.DELETE_ORGANISATION_IDS_FAILURE)
