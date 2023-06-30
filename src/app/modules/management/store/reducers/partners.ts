import { 
    createReducer, 
    on 
} from "@ngrx/store";
import {
    partnerStateInitial,
} from "../states";
import {
    createUpdatePartner,
    createUpdatePartnerFailure,
    createUpdatePartnerSuccess,
    getPartnerId,
    getPartnerIdFailure,
    getPartnerIdSuccess,
    getPartners,
    getPartnersFailure,
    getPartnersSuccess
} from "../actions";

export const partnerReducer = createReducer(
    partnerStateInitial,

    on(getPartners, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),

    on(getPartnersSuccess, (state, data) => {
        return {
            ...state,
            loading: false,
            partners: data.partners
        }
    }),

    on(getPartnersFailure, (state) => {
        return {
            ...state,
            loading: false,
        }
    }),

    on(getPartnerId, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),

    on(getPartnerIdSuccess, (state, data) => {
        return {
            ...state,
            loading: false,
            selectedPartner: data.partner
        }
    }),

    on(getPartnerIdFailure, (state) => {
        return {
            ...state,
            loading: false,
        }
    }),

    on(createUpdatePartner, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),

    on(createUpdatePartnerSuccess, (state) => {
        return {
            ...state,
            loading: false,
        }
    }),

    on(createUpdatePartnerFailure, (state) => {
        return {
            ...state,
            loading: false,
        }
    }),
    
)
