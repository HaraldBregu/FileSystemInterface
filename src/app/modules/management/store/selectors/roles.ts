import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ManagementState } from "../states";


const selectManagementFeature = createFeatureSelector<ManagementState>("MANAGEMENT_FEATURE");

export const selectPartnerRoleState = createSelector(selectManagementFeature, (state) => (state.partnerRoleState))

export const rolesLoading = createSelector(selectPartnerRoleState, (state) => (state.loading))
export const roles = createSelector(selectPartnerRoleState, (state) => (state.partnerRoles))
export const selectRoles = createSelector(selectPartnerRoleState, (state) => (state.partnerRoles))
export const selectedRole = createSelector(selectPartnerRoleState, (state) => (state.selectedRole))
