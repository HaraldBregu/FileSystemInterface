import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ManagementState } from "../states";

const selectManagementFeature = createFeatureSelector<ManagementState>("MANAGEMENT_FEATURE");

export const organizationState = createSelector(selectManagementFeature, (state) => (state.organizationState))
export const associatedOrganizations = createSelector(organizationState, (state) => (state.associatedOrganizations))
export const allOrganizations = createSelector(organizationState, (state) => (state.allOrganizations))
export const organizationLoading = createSelector(organizationState, (state) => (state.loading))
