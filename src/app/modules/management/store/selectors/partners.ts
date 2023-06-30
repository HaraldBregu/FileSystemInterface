import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ManagementState } from "../states";


const selectManagementFeature = createFeatureSelector<ManagementState>("MANAGEMENT_FEATURE");

export const selectPartnerState = createSelector(selectManagementFeature, (state) => (state.partnerState))

export const selectPartners = createSelector(selectPartnerState,(state) => (state.partners))
export const partnersLoading = createSelector(selectPartnerState,(state) => (state.loading ?? false))
export const selectedPartner = createSelector(selectPartnerState,(state) => (state.selectedPartner))
export const selectedPartnerId = createSelector(selectPartnerState,(state) => (state.selectedPartner?.partner_id ?? ''))
