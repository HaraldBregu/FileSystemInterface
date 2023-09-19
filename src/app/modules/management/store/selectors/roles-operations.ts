import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ManagementState } from "../states";


const selectManagementFeature = createFeatureSelector<ManagementState>("MANAGEMENT_FEATURE");

export const selectPartnerRoleOperationState = createSelector(selectManagementFeature, (state) => (state.roleOperationState))

export const roleOperationLoading = createSelector(selectPartnerRoleOperationState, (state) => (state.loading))
export const roleOperations = createSelector(selectPartnerRoleOperationState, (state) => (state.partnerRoleOperations))
export const selectedRoleOperation = createSelector(selectPartnerRoleOperationState, (state) => (state.selectedRoleOperation))
