import { createAction, props } from "@ngrx/store"
import { Partner } from "src/app/shared/interfaces/partner"

enum Action {

    GET_PARTNERS = '[PARTNERS][GET]',
    GET_PARTNERS_SUCCESS = '[PARTNERS][GET] success',
    GET_PARTNERS_FAILURE = '[PARTNERS][GET] failure',

    GET_PARTNER_ID = '[PARTNERID][GET]',
    GET_PARTNER_ID_SUCCESS = '[PARTNERID][GET] success',
    GET_PARTNER_ID_FAILURE = '[PARTNERID][GET] failure',

    DELETE_PARTNER_ID = '[PARTNERID][DELETE]',
    DELETE_PARTNER_ID_SUCCESS = '[PARTNERID][DELETE] success',
    DELETE_PARTNER_ID_FAILURE = '[PARTNERID][DELETE] failure',

    CREATE_UPDATE_PARTNER = '[PARTNER][CREATE][UPDATE]',
    CREATE_UPDATE_PARTNER_SUCCESS = '[PARTNER][CREATE][UPDATE] success',
    CREATE_UPDATE_PARTNER_FAILURE = '[PARTNER][CREATE][UPDATE] failure',

}

export const getPartners = createAction(Action.GET_PARTNERS, props<{ partnerName?: string, partnerRoleId?: string }>())
export const getPartnersSuccess = createAction(Action.GET_PARTNERS_SUCCESS, props<{ partners: Partner[] }>())
export const getPartnersFailure = createAction(Action.GET_PARTNERS_FAILURE)

export const getPartnerId = createAction(Action.GET_PARTNER_ID, props<{ partnerId: string }>())
export const getPartnerIdSuccess = createAction(Action.GET_PARTNER_ID_SUCCESS, props<{ partner: Partner }>())
export const getPartnerIdFailure = createAction(Action.GET_PARTNER_ID_FAILURE)

export const deletePartnerId = createAction(Action.DELETE_PARTNER_ID, props<{ partnerId: string }>())
export const deletePartnerIdSuccess = createAction(Action.DELETE_PARTNER_ID_SUCCESS)
export const deletePartnerIdFailure = createAction(Action.DELETE_PARTNER_ID_FAILURE)

export const createUpdatePartner = createAction(Action.CREATE_UPDATE_PARTNER, props<{ partner: Partner }>())
export const createUpdatePartnerSuccess = createAction(Action.CREATE_UPDATE_PARTNER_SUCCESS)
export const createUpdatePartnerFailure = createAction(Action.CREATE_UPDATE_PARTNER_FAILURE)
